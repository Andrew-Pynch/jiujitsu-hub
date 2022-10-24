import React from 'react';

type FThProps = {
    children?: React.ReactNode;
    label?: string;
    style?: React.CSSProperties;
};

const FTh = (props: FThProps) => {
    return (
        <span
            style={{
                fontSize: 18,
                fontWeight: 'bold',
                ...props.style,
            }}
        >
            {props.children ?? props.label}
        </span>
    );
};

export default FTh;
