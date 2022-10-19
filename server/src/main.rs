mod api;
mod constants;
mod model;

use std::{env, net::Ipv4Addr};

use actix_web::{middleware::Logger, web::Data, App, HttpServer};

use api::match_record_request::{
    delete_all_match_records, get_all_match_records, get_match_record, post_match_record,
    post_match_record_example, update_match_record_by_id,
};
use dotenv::dotenv;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "debug");
    std::env::set_var("RUST_BACKTRACE", "1");
    env_logger::init();

    let host: Ipv4Addr;
    let port: u16;
    let args: Vec<String> = env::args().collect();
    dbg!("ARGS", args.clone());
    if args[1] == "prod" {
        host = Ipv4Addr::new(0, 0, 0, 0);
        port = args[2].parse::<u16>().unwrap();
    } else {
        host = Ipv4Addr::new(127, 0, 0, 1);
        port = 8080;
    }

    // dotenv().ok(); // This line loads the environment variables from the ".env" file.
    let redis_client = redis::Client::open(
        "redis://default:jgkaZXUErywVyWqWj5NF@containers-us-west-59.railway.app:7051",
    )
    .unwrap();

    let rdb_data = Data::new(redis_client);
    HttpServer::new(move || {
        // let ddb_repo: DDBRepository = DDBRepository::init(String::from("task"), config.clone());
        // let ddb_data = Data::new(ddb_repo);
        let logger = Logger::default();
        App::new()
            .wrap(logger)
            .app_data(rdb_data.clone())
            .service(get_all_match_records)
            .service(get_match_record)
            .service(post_match_record_example)
            .service(post_match_record)
            .service(update_match_record_by_id)
            .service(delete_all_match_records)
    })
    .bind((host, port))?
    .run()
    .await
}
