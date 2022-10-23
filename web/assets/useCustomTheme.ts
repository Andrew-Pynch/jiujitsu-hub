export const THEME = {
    breakpoints: ['40em', '52em', '64em'],
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],

    colors: {
        primary: '#f6f6ff',
        secondary: '#07c',
    },
    space: [0, 4, 8, 16, 32, 64, 128, 256],
    fonts: {
        body: 'system-ui, sans-serif',
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
    const primary = THEME.colors.primary;
    const secondary = THEME.colors.secondary;

    return {
        primary,
        secondary,
    };
};