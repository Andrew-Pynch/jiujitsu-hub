export enum EModalType {
    EDIT_MATCH_RECORD,
    DELETE_MATCH_RECORD,
}

export interface IToggleFModal {
    title?: string;
    type?: EModalType;
    children?: React.ReactNode;
    maxWidth?: string | number;
    maxHeight?: string | number;
    color?: string;
    preventClose?: boolean;
}

export interface IModalState {
    coords: { x: number; y: number };
    dialogIsOpen: boolean;
    data: IToggleFModal;

    // actions
    toggleFDialog: (isOpen: boolean, data: IToggleFModal) => void;

    clearModalStore: () => void;
}

export const modalStore = (set: any, get: () => IModalState): IModalState => ({
    coords: { x: 0, y: 0 },
    dialogIsOpen: false,
    data: {},

    toggleFDialog: (isOpen: boolean, data: IToggleFModal) => {
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
