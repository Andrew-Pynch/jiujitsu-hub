import React, { useEffect, useMemo, useState } from 'react';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useTable } from 'react-table';
import { TableVirtuoso } from 'react-virtuoso';
import { Box } from 'rebass';
import { useCustomTheme } from '../../assets/useCustomTheme';
import {
    IMatchRecord,
    parseMatchRecords,
    useGetMatchRecordRows,
} from '../../domain/MatchRecord';
import { NetworkCode } from '../../middleware/CustomFetch';
import { useMatchRecordApi } from '../../middleware/useMatchRecordApi';

type ShowRecordsProps = {};

const ShowRecords = (props: ShowRecordsProps) => {
    const {
        primary,
        secondary,
        success,
        successFocus,
        danger,
        dangerFocus,
        warning,
        warningFocus,
    } = useCustomTheme();

    const { getAllMatchRecords } = useMatchRecordApi();
    const { getRows } = useGetMatchRecordRows();

    const [loading, setLoading] = useState(true);
    const [matchRecords, setMatchRecords] = useState<IMatchRecord[]>([]);
    const columns: any = useMemo(() => getColumns(), []);
    const data = useMemo(
        () => getRows(matchRecords, setMatchRecords),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [matchRecords, setMatchRecords]
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            columns,
            data,
        });

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
                    setLoading(false);
                }
            }
        };
        handleGetAllMatchRecords();
    }, []);

    if (loading) return <>Loading...</>;
    return (
        <Box>
            <h1>Match Records</h1>

            <Box>
                <TableVirtuoso
                    style={{
                        height: '200px',
                        width: '100%',
                    }}
                    totalCount={rows.length}
                    components={{
                        Table: ({ style, ...props }) => (
                            <table
                                {...getTableProps()}
                                {...props}
                                style={{
                                    ...style,
                                    width: '100%',
                                    tableLayout: 'fixed',
                                }}
                            />
                        ),
                        // eslint-disable-next-line react/display-name
                        TableBody: React.forwardRef(
                            ({ style, ...props }, ref) => (
                                <tbody
                                    {...getTableBodyProps()}
                                    {...props}
                                    ref={ref}
                                />
                            )
                        ),
                        TableRow: (props) => {
                            const index = props['data-index'];
                            const row = rows[index];
                            return <tr {...props} {...row.getRowProps()} />;
                        },
                    }}
                    fixedHeaderContent={() => {
                        return headerGroups.map((headerGroup) => (
                            // eslint-disable-next-line react/jsx-key
                            <tr
                                {...headerGroup.getHeaderGroupProps()}
                                style={{ background: 'white' }}
                            >
                                {headerGroup.headers.map((column) => (
                                    // eslint-disable-next-line react/jsx-key
                                    <th
                                        style={{
                                            background: 'lightgrey',
                                            width:
                                                column.Header === 'Notes'
                                                    ? ''
                                                    : 100,
                                        }}
                                        {...column.getHeaderProps()}
                                    >
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ));
                    }}
                    itemContent={(index, user) => {
                        const row = rows[index];
                        prepareRow(row);
                        return row.cells.map((cell) => {
                            return (
                                // eslint-disable-next-line react/jsx-key
                                <td
                                    style={{
                                        textAlign:
                                            cell.column.Header === 'Delete' ||
                                            cell.column.Header === 'Edit'
                                                ? 'center'
                                                : 'left',
                                        border: '1px solid #f9f9f9',
                                        width:
                                            cell.column.Header === 'Notes'
                                                ? 'calc(100% - 100px)'
                                                : 100,
                                        display:
                                            cell.column.Header === 'Notes'
                                                ? 'inline-block'
                                                : undefined,
                                    }}
                                    {...cell.getCellProps()}
                                >
                                    {cell.render('Cell')}
                                </td>
                            );
                        });
                    }}
                />
            </Box>
        </Box>
    );
};

const getColumns = () => {
    return [
        {
            Header: 'Recorded On',
            accessor: 'recorded_on',
        },
        {
            Header: 'Edit',
            accessor: 'edit',
        },
        {
            Header: 'Delete',
            accessor: 'delete',
        },
        {
            Header: 'Opponent',
            accessor: 'opponent', // accessor is the "key" in the data
        },
        {
            Header: 'Result',
            accessor: 'result',
        },
        {
            Header: 'Result By',
            accessor: 'result_by',
        },
        {
            Header: 'Submission Type',
            accessor: 'submission_type',
        },
        {
            Header: 'Positions Struggled In',
            accessor: 'positions_struggled_in',
        },
        {
            Header: 'Notes',
            accessor: 'notes',
        },
    ];
};

export default React.memo(ShowRecords);
