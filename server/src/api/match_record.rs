use std::io;

use actix_web::{
    error, get, middleware, post,
    web::{self, Data, Json},
    App, HttpResponse, HttpServer, Responder,
};
use redis::Client;
use serde::Deserialize;

#[derive(Debug, Clone)]
pub enum EMatchResult {
    Points,
    Submission,
}

#[derive(Debug)]
pub struct MatchRecord {
    opponent: String,
    won: bool,
    stalled: bool,
    tied: bool,
    lost: bool,
    approximate_match_duration: u64, // minutes
    result_by: EMatchResult,
    submission_type: String,
    positions_struggled_in: [String],
}

#[get("/match_record/all")]
pub async fn get_match_record(rdb_data: Data<Client>) -> Json<String> {
    return Json(String::from("Hello World from get_match_record"));
}

#[post("/match_record")]
pub async fn post_match_record(rdb_data: Data<Client>) -> Json<String> {
    let mut conn = rdb_data.get_connection().unwrap();
    let _: () = redis::cmd("SET")
        .arg("my_key2")
        .arg("Second Value")
        .query(&mut conn)
        .unwrap();

    return Json(String::from("post match record"));
}
