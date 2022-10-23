import { Column, ReactGrid, Row } from '@silevis/reactgrid';
import '@silevis/reactgrid/styles.css';
import { useEffect, useState } from 'react';
import { useCustomTheme } from '../../assets/useCustomTheme';
import {
    getMatchResult,
    IMatchRecord,
    parseMatchRecords,
} from '../../domain/MatchRecord';
import { NetworkCode } from '../../middleware/CustomFetch';
import { useMatchRecordApi } from '../../middleware/useMatchRecordApi';

type ShowRecordsProps = {};

const ShowRecords = (props: ShowRecordsProps) => {
    const { primary, secondary } = useCustomTheme();

    const { getAllMatchRecords } = useMatchRecordApi();

    const [loading, setLoading] = useState(true);
    const [matchRecords, setMatchRecords] = useState<IMatchRecord[]>([]);
    const [rows, setRows] = useState<Row[]>([]);
    const [columns, setColumns] = useState<Column[]>([]);

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
                    const matchRecords: IMatchRecord[] =
                        parseMatchRecords(parsedJson);
                    setMatchRecords(matchRecords);
                    const rows = getRows(matchRecords);
                    // delete the last element of rows
                    // because it is an empty row
                    rows.pop();
                    console.log('rows', parsedJson, rows, matchRecords);
                    setRows(rows);

                    setColumns(getColumns());
                    setLoading(false);
                }
            }
        };
        handleGetAllMatchRecords();
    }, []);

    const getColumns = (): Column[] => [
        { columnId: 'match_id', width: 150 },
        { columnId: 'opponent', width: 150 },
        { columnId: 'result', width: 150 },
        { columnId: 'approximate_match_duration', width: 100 },
        { columnId: 'result_by', width: 150 },
        { columnId: 'submission_type', width: 150 },
        // { columnId: 'positions_struggled_in', width: 150 },
        { columnId: 'notes', width: 150 },
    ];

    const headerRow: Row = {
        rowId: 'header',
        cells: [
            { type: 'header', text: 'Match ID' },
            { type: 'header', text: 'Opponent' },
            { type: 'header', text: 'Result' },
            { type: 'header', text: 'Approximate Match Duration' },
            { type: 'header', text: 'Result By' },
            { type: 'header', text: 'Submission Type' },
            // { type: 'header', text: 'Positions Struggled In' },
            { type: 'header', text: 'Notes' },
        ],
    };

    const getRows = (matches: IMatchRecord[]): Row[] => [
        headerRow,
        ...matches.map<Row>((match, idx) => ({
            rowId: idx,
            cells: [
                { type: 'text', text: match.match_id },
                { type: 'text', text: match.opponent },
                { type: 'text', text: getMatchResult(match) },
                { type: 'number', value: match.approximate_match_duration },
                { type: 'text', text: match.result_by },
                { type: 'text', text: match.submission_type },
                // { type: 'text', text: match.positions_struggled_in.toString() },
                { type: 'text', text: match.notes },
            ],
        })),
    ];

    if (loading) return <>Loading...</>;
    return (
        <div>
            <h1>Match Records</h1>
            <ReactGrid rows={rows} columns={columns} />
        </div>
    );
};

export default ShowRecords;
