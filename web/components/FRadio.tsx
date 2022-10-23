import { Radio } from '@rebass/forms';
import { MouseEventHandler } from 'react';
import { useCustomTheme } from '../assets/useCustomTheme';

type FRadioProps = {
    name?: string;
    onClick?: MouseEventHandler<HTMLInputElement>;
};

const FRadio = (props: FRadioProps) => {
    const { primary } = useCustomTheme();

    return (
        <Radio
            color={primary}
            name={props.name}
            onClick={props.onClick}
            sx={{
                transition: 'all ease-out 0.2s',
            }}
        />
    );
};

export default FRadio;
