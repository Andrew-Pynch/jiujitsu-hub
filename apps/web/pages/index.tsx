import type { NextPage } from 'next';
import { ThemeProvider } from '@emotion/react';
import { Box, Button, Card, Flex, Heading, Text } from 'rebass';
import { useTheme, THEME } from '../assets/useTheme';
import Link from 'next/link';

const Home: NextPage = () => {
    const { primary, secondary } = useTheme();

    return (
        <ThemeProvider theme={THEME}>
            <Button>
                <Link
                    href={{
                        pathname: '/login',
                    }}
                >
                    Login
                </Link>
            </Button>
        </ThemeProvider>
    );
};

export default Home;
