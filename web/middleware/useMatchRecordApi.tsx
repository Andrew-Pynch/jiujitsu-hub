import { IMatchRecord } from '../domain/MatchRecord';
import { customFetch, RequestType } from './CustomFetch';

export const useMatchRecordApi = () => {
    const test = async () => {
        const result = await customFetch(RequestType.GET, '/hello', '', {});

        return result;
    };

    const getAllMatchRecords = async () => {
        const result = await customFetch(
            RequestType.GET,
            '/match_record/all',
            '',
            {}
        );

        return result;
    };

    const getMatchRecordById = async (id: string) => {
        const result = await customFetch(
            RequestType.GET,
            '/match_record/' + id,
            '',
            {}
        );

        return result;
    };

    const addExampleMatchRecord = async () => {
        const result = await customFetch(
            RequestType.POST,
            '/match_record/example',
            '',
            {}
        );

        return result;
    };

    const addMatchRecord = async (matchRecord: IMatchRecord) => {
        console.log('adding match record', matchRecord);
        const result = await customFetch(
            RequestType.POST,
            '/match_record',
            '',
            matchRecord
        );

        return result;
    };

    const updateMatchRecord = async (matchRecord: IMatchRecord, id: string) => {
        const result = await customFetch(
            RequestType.PUT,
            '/match_record/' + id,
            '',
            matchRecord
        );

        return result;
    };

    const deleteAllMatchRecords = async () => {
        const result = await customFetch(
            RequestType.DELETE,
            '/match_record/all',
            '',
            {}
        );

        return result;
    };

    const deleteMatchRecordById = async (id: string) => {
        const result = await customFetch(
            RequestType.DELETE,
            '/match_record/' + id,
            '',
            {}
        );

        return result;
    };

    return {
        test,
        getAllMatchRecords,
        getMatchRecordById,
        addExampleMatchRecord,
        addMatchRecord,
        updateMatchRecord,
        deleteAllMatchRecords,
        deleteMatchRecordById,
    };
};
