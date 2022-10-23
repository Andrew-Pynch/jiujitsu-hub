import { IMatchRecord } from '../domain/MatchRecord';
import { customFetch, NetworkCode, RequestType } from './CustomFetch';

export const useMatchRecordApi = () => {
    const test = async () => {
        const result = await customFetch(RequestType.GET, '/hello', '', {});
        if (result.status === NetworkCode.OK) {
            return await result.json();
        }
    };

    const getAllMatchRecords = async () => {
        const result = await customFetch(
            RequestType.GET,
            '/match_record/all',
            '',
            {}
        );
        if (result.status === NetworkCode.OK) {
            return await result.json();
        }
    };

    const getMatchRecordById = async (id: string) => {
        const result = await customFetch(
            RequestType.GET,
            '/match_record/' + id,
            '',
            {}
        );
        if (result.status === NetworkCode.OK) {
            return await result.json();
        }
    };

    const addExampleMatchRecord = async () => {
        const result = await customFetch(
            RequestType.POST,
            '/match_record/example',
            '',
            {}
        );
        if (result.status === NetworkCode.OK) {
            return await result.json();
        }
    };

    const addMatchRecord = async (matchRecord: IMatchRecord) => {
        const result = await customFetch(
            RequestType.POST,
            '/match_record',
            '',
            matchRecord
        );
        if (result.status === NetworkCode.OK) {
            return await result.json();
        }
    };

    const updateMatchRecord = async (matchRecord: IMatchRecord, id: string) => {
        const result = await customFetch(
            RequestType.PUT,
            '/match_record/' + id,
            '',
            matchRecord
        );
        if (result.status === NetworkCode.OK) {
            return await result.json();
        }
    };

    const deleteAllMatchRecords = async () => {
        const result = await customFetch(
            RequestType.DELETE,
            '/match_record/all',
            '',
            {}
        );
        if (result.status === NetworkCode.OK) {
            return await result.json();
        }
    };

    const deleteMatchRecordById = async (id: string) => {
        const result = await customFetch(
            RequestType.DELETE,
            '/match_record/' + id,
            '',
            {}
        );
        if (result.status === NetworkCode.OK) {
            return await result.json();
        }
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
