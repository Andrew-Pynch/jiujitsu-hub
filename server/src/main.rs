mod api;
use api::match_record::{get_match_record, post_match_record};

use actix_web::{middleware::Logger, web::Data, App, HttpServer};

use dotenv::dotenv;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "debug");
    std::env::set_var("RUST_BACKTRACE", "1");
    env_logger::init();

    dotenv().ok(); // This line loads the environment variables from the ".env" file.
    let redis_connection_string =
        std::env::var("REDIS_CONNECTION_STRING").expect("REDIS_CONNECTION_STRING must be set");

    let redis_client = redis::Client::open(redis_connection_string).unwrap();

    let rdb_data = Data::new(redis_client);
    HttpServer::new(move || {
        // let ddb_repo: DDBRepository = DDBRepository::init(String::from("task"), config.clone());
        // let ddb_data = Data::new(ddb_repo);
        let logger = Logger::default();
        App::new()
            .wrap(logger)
            .app_data(rdb_data.clone())
            .service(get_match_record)
            .service(post_match_record)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
