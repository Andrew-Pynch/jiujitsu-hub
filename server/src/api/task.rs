use actix_web::{
    dev::Path,
    error::ResponseError,
    get, post,
    web::{self, Json},
    HttpResponse,
};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct TaskIdentifier {
    task_global_id: String,
}

// #[get("/task/{task_global_id}")]
// pub fn get_task(task_identifier: Path<TaskIdentifier>, body: Json) -> Json<String> {
//     return Json(task_identifier.into_inner().task_global_id);
// }

#[get("/task")]
pub async fn get_task() -> Json<String> {
    return Json(String::from("Hello World"));
}

#[post("/task")]
pub async fn post_task() -> Json<String> {
    return Json(String::from("Hello World"));
}
