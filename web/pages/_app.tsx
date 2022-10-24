import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { Box } from 'rebass';
import { THEME } from '../assets/useCustomTheme';
import FDialog from '../components/dialogs/FDialog';
import NavigationSidebar from '../components/NavigationSidebar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        // Provide the client to your App
        <ThemeProvider theme={THEME}>
            <Box display={'flex'} flex={1} height={'100vh'}>
                <Box flexDirection={'column'} maxWidth="15%">
                    <NavigationSidebar />
                </Box>
                <Box width="5%" />
                <Box flexDirection={'column'} maxWidth="80%" flexGrow={1}>
                    <Component {...pageProps} />
                </Box>
            </Box>
            <Toaster />
            <FDialog />
        </ThemeProvider>
    );
}

export default MyApp;
