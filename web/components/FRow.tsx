import React from 'react';
import { Flex } from 'rebass';

type FRowProps = {
    children: React.ReactNode;
    style?: React.CSSProperties;
};

const FRow = (props: FRowProps) => {
    return (
        <>
            <Flex
                marginBottom={'1em'}
                style={props.style}
                sx={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Flex
                    sx={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {props.children}
                </Flex>
            </Flex>
        </>
    );
};

export default FRow;
