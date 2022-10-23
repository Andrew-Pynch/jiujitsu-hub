import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Box, Button, Text } from 'rebass';
import { useCustomTheme } from '../assets/useCustomTheme';

type NavigationSidebarProps = {};

const NavigationSidebar = (props: NavigationSidebarProps) => {
    const router = useRouter();

    const { background, primary, secondary, textPrimary, textSecondary } =
        useCustomTheme();

    const [isOpen, setIsOpen] = useState(true);
    const [width, setWidth] = useState<'200px' | '50px'>('200px');

    const handleHamburgerClick = () => {
        const newIsOpenValue = !isOpen;
        setIsOpen(newIsOpenValue);
        if (newIsOpenValue) setWidth('200px');
        else setWidth('50px');
    };

    interface IRoute {
        path: string;
        label: string;
    }

    const routes: IRoute[] = [
        {
            path: '/show_records',
            label: 'Show Records',
        },
        {
            path: '/add_record',
            label: 'Add Record',
        },
    ];

    return (
        <Box
            width={width}
            backgroundColor={primary}
            style={{
                transition: 'all ease-out 0.5s',
            }}
            height="100%"
        >
            <Button
                width={'25px'}
                backgroundColor={primary}
                sx={{
                    ':hover': {
                        opacity: 0.8,
                        cursor: 'pointer',
                    },
                }}
                onClick={handleHamburgerClick}
            >
                <GiHamburgerMenu size={'15px'} color={secondary} />
            </Button>
            {isOpen && (
                <Box>
                    {routes.map((route: IRoute, index: number) => {
                        return (
                            <Box
                                key={route.path}
                                height="50px"
                                backgroundColor={
                                    router.pathname === route.path
                                        ? secondary
                                        : primary
                                }
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    ':hover': {
                                        backgroundColor: secondary,
                                        cursor: 'pointer',
                                    },
                                }}
                            >
                                <Link
                                    href={{
                                        pathname: route.path,
                                    }}
                                >
                                    <Text fontSize={28} fontWeight={600}>
                                        {route.label}
                                    </Text>
                                </Link>
                            </Box>
                        );
                    })}
                </Box>
            )}
        </Box>
    );
};

export default NavigationSidebar;
