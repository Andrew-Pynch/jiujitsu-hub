import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useCustomTheme } from '../../assets/useCustomTheme';
import { useModalStore } from '../../state/store';
import SexyButton from '../FButton';

type FDialogProps = {};

const FDialog = (props: FDialogProps) => {
    const { background, primary } = useCustomTheme();

    const { coords, data, dialogIsOpen, toggleFDialog } = useModalStore(
        (state) => ({
            coords: state.coords,
            data: state.data,
            dialogIsOpen: state.dialogIsOpen,
            toggleFDialog: state.toggleFDialog,
        })
    );

    const closeFDialog = () => {
        if (data?.preventClose === true) return null;
        toggleFDialog(false, {});
    };

    const backdropStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(6,6,6,0.4)',
        backdropFilter: 'blur(7px)',
        transition: 'opacity 1s ease-in-out',
        zIndex: 1000,
    } as React.CSSProperties;

    const dialogStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: data?.maxWidth ?? '100%',
        maxHeight: data?.maxHeight ?? '70%',
        overflowY: 'scroll',
        backgroundColor: background,
        borderRadius: '8px',
        zIndex: 1001,
        padding: '32px',
        transition: 'opacity 1s ease-in-out',
    } as React.CSSProperties;

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'top',
    } as React.CSSProperties;

    const titleStyle = {
        fontSize: '32px',
        fontWeight: '800',
        color: data.color ?? primary,
        maxWidth: '70%',
    } as React.CSSProperties;

    const bodyStyle = {} as React.CSSProperties;

    const closeButtonStyle = {
        width: '26px',
        height: '26px',
        cursor: 'pointer',
    } as React.CSSProperties;

    return (
        <>
            {dialogIsOpen && (
                <>
                    <div style={backdropStyle} onClick={closeFDialog}></div>

                    <div style={dialogStyle}>
                        <div style={headerStyle}>
                            <div style={titleStyle}>{data?.title ?? ''}</div>
                            {!data?.preventClose && (
                                <SexyButton
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '30px',
                                    }}
                                    color={data.color ?? primary}
                                    onClick={closeFDialog}
                                >
                                    <AiOutlineCloseCircle size={20} />
                                </SexyButton>
                            )}
                        </div>
                        {data?.children && (
                            <div key={data.title} style={bodyStyle}>
                                {data.children}
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default FDialog;
