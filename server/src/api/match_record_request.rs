use actix_web::{
    delete, error, get, post, put,
    web::{self, Data, Json},
};
use redis::Client;

use crate::model::match_record::{
    get_example_match_record, get_formatted_match_record, MatchRecord,
};

#[get("/match_record/all")]
pub async fn get_all_match_records(rdb_data: Data<Client>) -> Json<String> {
    let mut conn = rdb_data.get_connection().unwrap();

    let match_records: Vec<String> = redis::cmd("KEYS").arg("*").query(&mut conn).unwrap();

    let mut match_record_json = String::from("[");
    for match_record in match_records {
        let match_record_json_str: String = redis::cmd("GET")
            .arg(match_record.clone())
            .query(&mut conn)
            .unwrap();
        match_record_json.push_str(&match_record_json_str);
        match_record_json.push_str(",");
    }
    match_record_json.pop();
    match_record_json.push_str("]");
    return Json(match_record_json);
}

#[get("/match_record/{match_id}")]
pub async fn get_match_record(
    rdb_data: Data<Client>,
    match_id: web::Path<String>,
) -> Result<Json<String>, error::Error> {
    let mut conn = rdb_data.get_connection().unwrap();

    let match_record_json: String = redis::cmd("GET")
        .arg(match_id.to_string())
        .query(&mut conn)
        .unwrap();

    return Ok(Json(match_record_json));
}

#[post("/match_record/example")]
pub async fn post_match_record_example(rdb_data: Data<Client>) -> Json<String> {
    let mut conn = rdb_data.get_connection().unwrap();

    // generate a random match id string with uuid library
    let match_id = uuid::Uuid::new_v4().to_string();

    let example_match = get_example_match_record(match_id.clone());

    let match_json = serde_json::to_string(&example_match).unwrap();

    let _: () = redis::cmd("SET")
        .arg(match_id)
        .arg(match_json)
        .query(&mut conn)
        .unwrap();

    return Json(String::from("post match record"));
}

#[post("/match_record")]
pub async fn post_match_record(
    rdb_data: Data<Client>,
    match_record: Json<MatchRecord>,
) -> Json<String> {
    let mut conn = rdb_data.get_connection().unwrap();

    let match_id = uuid::Uuid::new_v4().to_string();

    let formatted_match_record = get_formatted_match_record(match_id.clone(), match_record.clone());

    let match_json = serde_json::to_string(&formatted_match_record).unwrap();

    let _: () = redis::cmd("SET")
        .arg(match_id.clone())
        .arg(match_json)
        .query(&mut conn)
        .unwrap();

    return Json(String::from("post match record"));
}

#[put("/match_record/{match_id}")]
pub async fn update_match_record_by_id(
    rdb_data: Data<Client>,
    match_record: Json<MatchRecord>,
    match_id: web::Path<String>,
) -> Result<Json<String>, error::Error> {
    let mut conn = rdb_data.get_connection().unwrap();

    let match_json = serde_json::to_string(&match_record).unwrap();

    let match_record_json: String = redis::cmd("SET")
        .arg(match_id.clone())
        .arg(match_json)
        .query(&mut conn)
        .unwrap();

    return Ok(Json(match_record_json));
}

#[delete("/match_record/all")]
async fn delete_all_match_records(rdb_data: Data<Client>) -> Json<String> {
    let mut conn = rdb_data.get_connection().unwrap();

    let _: () = redis::cmd("FLUSHDB").query(&mut conn).unwrap();

    return Json(String::from("Successfully wiped database"));
}

#[delete("/match_record/{match_id}")]
async fn delete_match_record_by_id(
    rdb_data: Data<Client>,
    match_id: web::Path<String>,
) -> Result<Json<String>, error::Error> {
    let mut conn = rdb_data.get_connection().unwrap();

    let _: () = redis::cmd("DEL")
        .arg(match_id.clone())
        .query(&mut conn)
        .unwrap();

    return Ok(Json("Successfully deleted match record".to_string()));
}
