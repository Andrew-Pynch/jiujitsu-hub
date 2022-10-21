export enum EMatchResult {
    POINTS = 'Points',
    SUBMISSION = 'Submission',
}

export interface IMatchRecord {
    match_id: string;
    opponent: string;
    won: boolean;
    stalled: boolean;
    tied: boolean;
    lost: boolean;
    approximate_match_duration: number;
    result_by: EMatchResult;
    submission_type: string;
    positions_struggled_in: string[];
}
