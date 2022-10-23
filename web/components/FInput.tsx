import { Input } from '@rebass/forms';
import React, { ChangeEventHandler } from 'react';
import { useCustomTheme } from '../assets/useCustomTheme';

type FInputProps = {
    type?: React.HTMLInputTypeAttribute;
    name?: string;
    value?: string | number | readonly string[] | undefined;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
};

const FInput = (props: FInputProps) => {
    const { primary, secondary, textPrimary, textSecondary } = useCustomTheme();

    return (
        <Input
            type="number"
            name="approximateDuration"
            onChange={props.onChange}
            value={props.value}
            style={{
                borderColor: primary,
            }}
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
            }}
        />
    );
};

export default FInput;
