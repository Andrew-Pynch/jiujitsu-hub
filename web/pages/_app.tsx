import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Box } from 'rebass';
import { THEME } from '../assets/useTheme';
import { trpc } from '../config/trpc';

const client = new QueryClient();

const AppContent = () => {
    const getMessages = trpc.useQuery(['getMessages']);
    console.log('get messages', getMessages);

    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const addMessage = trpc.useMutation('addMessage');
    const onAdd = () => {
        addMessage.mutate({
            message,
            user,
        });
    };

    return (
        <Box>
            <div>
                {(getMessages.data ?? []).map((row) => (
                    <div key={row.message}>{JSON.stringify(row)}</div>
                ))}
            </div>
        </Box>
    );
};

function MyApp({ Component, pageProps }: AppProps) {
    // const [queryClient] = useState(() => );
    const [trpcClient] = useState(() =>
        trpc.createClient({
            url: 'http://localhost:8081/trpc',
        })
    );

    return (
        // Provide the client to your App
        <ThemeProvider theme={THEME}>
            <trpc.Provider client={trpcClient} queryClient={client}>
                <QueryClientProvider client={client}>
                    {/* <Component {...pageProps} /> */}
                    <AppContent />
                    <ReactQueryDevtools initialIsOpen={true} />
                </QueryClientProvider>
            </trpc.Provider>
        </ThemeProvider>
    );
}

export default MyApp;
