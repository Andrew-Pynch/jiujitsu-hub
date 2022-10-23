import { useEffect, useState } from 'react';
import { useCustomTheme } from '../../assets/useCustomTheme';
import { IMatchRecord } from '../../domain/MatchRecord';
import { NetworkCode } from '../../middleware/CustomFetch';
import { useMatchRecordApi } from '../../middleware/useMatchRecordApi';

type ShowRecordsProps = {};

const ShowRecords = (props: ShowRecordsProps) => {
    const { primary, secondary } = useCustomTheme();

    const { getAllMatchRecords } = useMatchRecordApi();

    const [loading, setLoading] = useState(true);
    const [matchRecords, setMatchRecords] = useState<IMatchRecord[]>([]);

    useEffect(() => {
        const handleGetAllMatchRecords = async () => {
            const result = await getAllMatchRecords();

            if (result.status === NetworkCode.OK) {
                const json = await result.json();
                // serialize the json into an array of IMatchRecord
                if (json === ']') {
                    setMatchRecords([]);
                    setLoading(false);
                } else {
                    const parsedJson = JSON.parse(json);
                    const matchRecords: IMatchRecord[] = parsedJson.map(
                        (matchRecord: IMatchRecord) => {
                            return {
                                id: matchRecord.match_id,
                                opponent: matchRecord.opponent,
                                won: matchRecord.won,
                                stalled: matchRecord.stalled,
                                tied: matchRecord.tied,
                                lost: matchRecord.lost,
                                approximate_match_duration:
                                    matchRecord.approximate_match_duration,
                                result_by: matchRecord.result_by,
                                submission_type: matchRecord.submission_type,
                                posistions_struggled_in:
                                    matchRecord.positions_struggled_in,
                                notes: matchRecord.notes,
                            };
                        }
                    );
                    setMatchRecords(matchRecords);
                    setLoading(false);
                }
            }
        };
        handleGetAllMatchRecords();
    }, []);

    console.log(matchRecords);
    if (loading) return <>Loading...</>;
    return (
        <div>
            <h1>Match Records</h1>
            {matchRecords.map((matchRecord: IMatchRecord, index: number) => {
                return (
                    <div key={index}>
                        <h3>{matchRecord.opponent}</h3>
                        <p>{matchRecord.notes}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default ShowRecords;
