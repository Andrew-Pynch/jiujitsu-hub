import React from 'react';
import { Box } from 'rebass';
import { useTheme } from '../../assets/useTheme';

type LoginProps = {};

const Login = (props: LoginProps) => {
    const { primary, secondary } = useTheme();

    return <Box>Login</Box>;
};

export default Login;
