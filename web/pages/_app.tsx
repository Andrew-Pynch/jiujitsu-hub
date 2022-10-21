import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { THEME } from '../assets/useTheme';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        // Provide the client to your App
        <ThemeProvider theme={THEME}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
