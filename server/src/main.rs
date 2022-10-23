mod api;
mod constants;
mod model;

use std::{env, net::Ipv4Addr};

use actix_cors::Cors;
use actix_web::{
    http,
    middleware::Logger,
    web::{self, Data},
    App, HttpServer,
};

use api::match_record_request::{
    delete_all_match_records, delete_match_record_by_id, get_all_match_records, get_match_record,
    post_match_record, post_match_record_example, update_match_record_by_id,
};
use dotenv::dotenv;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    std::env::set_var("RUST_LOG", "debug");
    std::env::set_var("RUST_BACKTRACE", "1");
    env_logger::init();

    // let host = env::var("HOST").expect("HOST is not set");
    let host;
    let port = env::var("PORT").unwrap_or("8080".to_string());
    if port == "8080" {
        host = "127.0.0.1";
    } else {
        host = "0.0.0.0"
    }
    dbg!("Starting server on...", host.clone(), port.clone());

    // dotenv().ok(); // This line loads the environment variables from the ".env" file.
    let redis_client = redis::Client::open(
        "redis://default:jgkaZXUErywVyWqWj5NF@containers-us-west-59.railway.app:7051",
    )
    .unwrap();

    let rdb_data = Data::new(redis_client);
    HttpServer::new(move || {
        let cors = Cors::permissive();

        let logger = Logger::default();

        App::new()
            .wrap(logger)
            .wrap(cors)
            .app_data(rdb_data.clone())
            .route("/hello", web::get().to(|| async { "Hello World!" }))
            .service(get_all_match_records)
            .service(get_match_record)
            .service(post_match_record_example)
            .service(post_match_record)
            .service(update_match_record_by_id)
            .service(delete_all_match_records)
            .service(delete_match_record_by_id)
    })
    .bind(format!("{}:{}", host, port))?
    .run()
    .await
}
