import type { NextPage } from 'next';

import { Button } from 'rebass';

import Link from 'next/link';
import { useTheme } from '../assets/useTheme';

const Home: NextPage = () => {
    const { primary, secondary } = useTheme();

    return (
        <Button>
            <Link
                color={primary}
                href={{
                    pathname: '/login',
                }}
            >
                Login
            </Link>
        </Button>
    );
};

export default Home;
