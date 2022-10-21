import { customFetch, RequestType } from './CustomFetch';

export const useMatchRecordApi = () => {
    const test = async () => {
        const result = await customFetch(RequestType.GET, '/hello', '', {});
        console.log('result', result);
        return result;
    };

    return { test };
};
