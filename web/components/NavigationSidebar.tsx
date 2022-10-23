import Link from 'next/link';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Box, Button, Heading } from 'rebass';
import { useCustomTheme } from '../assets/useCustomTheme';

type NavigationSidebarProps = {};

const NavigationSidebar = (props: NavigationSidebarProps) => {
    const { primary, secondary } = useCustomTheme();

    const [isOpen, setIsOpen] = useState(true);
    const [width, setWidth] = useState<'200px' | '45px'>('200px');

    const handleHamburgerClick = () => {
        const newIsOpenValue = !isOpen;
        setIsOpen(newIsOpenValue);
        if (newIsOpenValue) setWidth('200px');
        else setWidth('45px');
    };

    return (
        <Box
            width={width}
            backgroundColor={secondary}
            style={{
                transition: 'all ease-out 0.5s',
            }}
        >
            <Button
                width={'20px'}
                backgroundColor={secondary}
                sx={{
                    ':hover': {
                        opacity: 0.8,
                        cursor: 'pointer',
                    },
                }}
                onClick={handleHamburgerClick}
            >
                <GiHamburgerMenu size={'15px'} color={primary} />
            </Button>
            {isOpen && (
                <Box>
                    <Box
                        sx={{
                            ':hover': {
                                opacity: 0.8,
                                cursor: 'pointer',
                            },
                        }}
                    >
                        <Link>
                            <Heading>Yeet</Heading>
                        </Link>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default NavigationSidebar;
