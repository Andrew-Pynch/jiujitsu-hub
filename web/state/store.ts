import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { IModalState, modalStore } from './modalsStore';

export type FetchReturn = {
    status: number;
    message: string;
    data?: any;
};

export type IStoreSchema = IModalState;

export const useModalStore = create(
    devtools(
        persist(modalStore, {
            name: 'ModalStore', // local storage name
            getStorage: () => localStorage,
        }),
        {
            name: 'ModalStore',
        }
    )
);

export const clearStores = () => {
    useModalStore.getState().clearModalStore();
};
