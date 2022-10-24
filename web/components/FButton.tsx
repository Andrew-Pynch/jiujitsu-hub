import React from 'react';
import { Button } from 'rebass';

type SexyButtonProps = {
    color: string;
    children?: React.ReactNode;
    label?: string;
};

const SexyButton = (props: SexyButtonProps) => {
    return (
        <Button
            backgroundColor={'transparent'}
            sx={{
                color: `${props.color}`,
                border: `2px solid ${props.color}`,
                backgroundImage: `linear-gradient(${props.color}, ${props.color});`,
                backgroundPosition: '50% 50%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '0% 100%',
                transition: 'background-size 0.3s',
                ':hover': {
                    backgroundSize: '100% 100%',
                    color: '#FFF',
                },
            }}
        >
            {props.children ?? props.label}
        </Button>
    );
};

export default SexyButton;
