import { Input } from '@rebass/forms';
import React, { ChangeEventHandler } from 'react';
import { useCustomTheme } from '../assets/useCustomTheme';

type FInputProps = {
    id?: string;
    type?: React.HTMLInputTypeAttribute;
    name?: string;
    value?: string | number | readonly string[] | undefined;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
};

const FInput = (props: FInputProps) => {
    const { primary, secondary, textPrimary, textSecondary } = useCustomTheme();

    return (
        <Input
            id={props.id}
            type={props.type}
            name={props.name}
            onChange={props.onChange}
            value={props.value}
            autoComplete="off"
            sx={{
                ':hover': {
                    opacity: 0.8,
                },
                ':focus': {
                    outline: 'none',
                    transition: 'all ease-out 0.2s',
                    borderRadius: '8px',
                    borderColor: primary,
                    color: textPrimary,
                },
                ':focus-within': {
                    outline: 'none',
                    transition: 'all ease-in 0.2s',
                },
            }}
        />
    );
};

export default FInput;
