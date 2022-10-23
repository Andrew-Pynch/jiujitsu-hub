use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize, Serialize, Copy)]
pub enum EMatchResult {
    Points,
    Submission,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct MatchRecord {
    pub match_id: String,
    pub opponent: String,
    pub won: bool,
    pub stalled: bool,
    pub tied: bool,
    pub lost: bool,
    pub approximate_match_duration: u64, // minutes
    pub result_by: EMatchResult,
    pub submission_type: String,
    pub positions_struggled_in: Vec<String>,
    pub notes: String,
}

pub fn get_example_match_record(match_id: String) -> MatchRecord {
    return MatchRecord {
        match_id: String::from(match_id),
        opponent: String::from("John Doe"),
        won: true,
        stalled: false,
        tied: false,
        lost: false,
        approximate_match_duration: 10,
        result_by: EMatchResult::Points,
        submission_type: String::from("Armbar"),
        positions_struggled_in: vec![String::from("Guard"), String::from("Side Control")],
        notes: "This was a great match!".to_string(),
    };
}

pub fn get_formatted_match_record(match_id: String, match_record: MatchRecord) -> MatchRecord {
    return MatchRecord {
        match_id: String::from(match_id),
        opponent: match_record.opponent,
        won: match_record.won,
        stalled: match_record.stalled,
        tied: match_record.tied,
        lost: match_record.lost,
        approximate_match_duration: match_record.approximate_match_duration,
        result_by: match_record.result_by,
        submission_type: match_record.submission_type,
        positions_struggled_in: match_record.positions_struggled_in,
        notes: match_record.notes,
    };
}
