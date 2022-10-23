import { IMatchRecord } from '../domain/MatchRecord';
import { customFetch, NetworkCode, RequestType } from './CustomFetch';

export const useMatchRecordApi = () => {
    const test = async () => {
        const result = await customFetch(RequestType.GET, '/hello', '', {});
        if (result.status === NetworkCode.OK) {
            return result;
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
            return result;
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
            return result;
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
            return result;
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
            return result;
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
            return result;
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
            return result;
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
            return result;
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
