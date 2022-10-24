import { HiPencil, HiTrash } from 'react-icons/hi2';
import { useCustomTheme } from '../assets/useCustomTheme';
import DeleteMatchRecordDialog from '../components/dialogs/DeleteMatchRecordDialog';
import EditMatchRecordDialog from '../components/dialogs/EditMatchRecordDialog';
import SexyButton from '../components/FButton';
import { EModalType } from '../state/modalsStore';
import { useModalStore } from '../state/store';
import { getFormatedTimeStamp } from './Time';

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
    recorded_on: number;
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
            recorded_on: matchRecord.recorded_on,
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

    const toggleFDialog = useModalStore((state) => state.toggleFDialog);

    const handleToggleEditMatchRecord = (match: IMatchRecord) => {
        toggleFDialog(true, {
            title: 'Edit Match Record',
            type: EModalType.EDIT_MATCH_RECORD,
            children: <EditMatchRecordDialog match={match} />,
            maxWidth: '1000px',
            color: warningFocus,
        });
    };

    const handleToggleDeleteMatchRecord = (match: IMatchRecord) => {
        toggleFDialog(true, {
            title: 'Delete Match Record',
            type: EModalType.DELETE_MATCH_RECORD,
            children: <DeleteMatchRecordDialog match={match} />,
            maxWidth: '1000px',
            color: danger,
        });
    };

    const getRows = (matchRecords: IMatchRecord[]) => {
        const rows = [];
        for (let i = 0; i < matchRecords.length; i++) {
            const match = matchRecords[i];

            rows.push({
                recorded_on: getFormatedTimeStamp(match.recorded_on),
                edit: (
                    <SexyButton
                        onClick={() => handleToggleEditMatchRecord(match)}
                        color={warningFocus}
                    >
                        <HiPencil />
                    </SexyButton>
                ),

                delete: (
                    <SexyButton
                        color={danger}
                        onClick={() => handleToggleDeleteMatchRecord(match)}
                    >
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
