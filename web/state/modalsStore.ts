export enum EModalType {
    DELETE_MATCH_RECORD,
}

export interface IToggleFModal {
    title?: string;
    type?: EModalType;
    children?: React.ReactNode;
    maxWidth?: string;
    color?: string;
}

export interface IModalState {
    coords: { x: number; y: number };
    dialogIsOpen: boolean;
    data: any;

    // actions
    toggleFDialog: (isOpen: boolean, data: any) => void;

    clearModalStore: () => void;
}

export const modalStore = (set: any, get: () => IModalState): IModalState => ({
    coords: { x: 0, y: 0 },
    dialogIsOpen: false,
    data: {},

    toggleFDialog: (isOpen: boolean, data: any) => {
        try {
            set(() => ({
                dialogIsOpen: isOpen,
                data: data,
            }));
        } catch (e) {
            console.error(
                'Failed to open dialog: no data or dialog type specified.',
                e
            );
        }
    },

    clearModalStore: () => {
        set(() => ({
            coords: { x: 0, y: 0 },
            dialogIsOpen: false,
            data: {},
        }));
    },
});
