import React from 'react';
import { Label } from '@rebass/forms';

type FLabelProps = {
    children: React.ReactNode;
    label?: string;
};

const FLabel = (props: FLabelProps) => {
    return <Label>{props.children}</Label>;
};

export default FLabel;
