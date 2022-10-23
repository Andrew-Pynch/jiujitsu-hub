export const THEME = {
    breakpoints: ['40em', '52em', '64em'],
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],

    colors: {
        background: '#FFFFFF',
        primary: '#FE6356',
        secondary: '#3AEFFE',
        text: {
            primary: '#000000',
            secondary: '#FFFFFF',
        },
    },
    space: [0, 4, 8, 16, 32, 64, 128, 256],
    fonts: {
        body: 'comic-sans',
        heading: 'inherit',
        monospace: 'Menlo, monospace',
    },
    fontWeights: {
        body: 400,
        heading: 700,
        bold: 700,
    },
    lineHeights: {
        body: 1.5,
        heading: 1.25,
    },
    shadows: {
        small: '0 0 4px rgba(0, 0, 0, .125)',
        large: '0 0 24px rgba(0, 0, 0, .125)',
    },
    variants: {},
    text: {},
    buttons: {
        primary: {
            color: 'white',
            bg: 'primary',
        },
    },
};

export const useCustomTheme = () => {
    const background = THEME.colors.background;
    const primary = THEME.colors.primary;
    const secondary = THEME.colors.secondary;

    const textPrimary = THEME.colors.text.primary;
    const textSecondary = THEME.colors.text.secondary;

    return {
        background,
        primary,
        secondary,
        textPrimary,
        textSecondary,
    };
};
