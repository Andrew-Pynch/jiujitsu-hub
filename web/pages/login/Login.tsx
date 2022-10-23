import { Box } from 'rebass';
import { useCustomTheme } from '../../assets/useCustomTheme';

type LoginProps = {};

const Login = (props: LoginProps) => {
    const { primary, secondary } = useCustomTheme();

    return <Box backgroundColor={primary}>Login</Box>;
};

export default Login;
