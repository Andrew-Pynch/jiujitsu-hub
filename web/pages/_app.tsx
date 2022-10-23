import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { Box } from 'rebass';
import { THEME } from '../assets/useCustomTheme';
import NavigationSidebar from '../components/NavigationSidebar';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        // Provide the client to your App
        <ThemeProvider theme={THEME}>
            <Box display={'flex'} flex={1}>
                <Box flexDirection={'column'} width="15%">
                    <NavigationSidebar />
                </Box>
                <Box width="5%" />
                <Box flexDirection={'column'} width="80%">
                    <Component {...pageProps} />
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default MyApp;
