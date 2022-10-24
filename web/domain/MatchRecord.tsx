import { HiPencil, HiTrash } from 'react-icons/hi2';
import { useCustomTheme } from '../assets/useCustomTheme';
import SexyButton from '../components/FButton';

export enum EMatchResult {
    POINTS = 'Points',
    SUBMISSION = 'Submission',
    DEFAULT = '',
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
    notes: string;
}

export const parseMatchRecords = (parsedJson: any): IMatchRecord[] => {
    return parsedJson.map((matchRecord: IMatchRecord) => {
        return {
            match_id: matchRecord.match_id,
            opponent: matchRecord.opponent,
            won: matchRecord.won,
            stalled: matchRecord.stalled,
            tied: matchRecord.tied,
            lost: matchRecord.lost,
            approximate_match_duration: matchRecord.approximate_match_duration,
            result_by: matchRecord.result_by,
            submission_type: matchRecord.submission_type,
            posistions_struggled_in: matchRecord.positions_struggled_in,
            notes: matchRecord.notes,
        };
    });
};

export const getMatchResult = (match: IMatchRecord) => {
    if (match.won) return 'Won';
    if (match.stalled) return 'Stalled';
    if (match.tied) return 'Tied';
    if (match.lost) return 'Lost';
    else return 'Tied';
};

export const useGetMatchRecordRows = () => {
    const { danger, warningFocus } = useCustomTheme();

    const getRows = (matchRecords: IMatchRecord[]) => {
        const rows = [];
        for (let i = 0; i < matchRecords.length; i++) {
            const match = matchRecords[i];
            rows.push({
                edit: (
                    <SexyButton color={warningFocus}>
                        <HiPencil />
                    </SexyButton>
                ),

                delete: (
                    <SexyButton color={danger}>
                        <HiTrash />
                    </SexyButton>
                ),

                opponent: match.opponent,
                result: getMatchResult(match),
                result_by: match.result_by,
                submission_type: match.submission_type,
                positions_struggled_in: match.positions_struggled_in,
                notes: match.notes,
            });
        }
        return rows;
    };

    return {
        getRows,
    };
};
