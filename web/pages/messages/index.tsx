import { NextPage } from 'next';
import { useState } from 'react';
import { Box } from 'rebass';
import { useTheme } from '../../assets/useTheme';
import { trpc } from '../../config/trpc';

const Home: NextPage = () => {
    const { primary, secondary } = useTheme();
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

export default Home;
