const sharedTheme = {
    fonts: {
        primary: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        secondary: 'Georgia, "Times New Roman", Times, serif',
    },
    fontSizes: {
        small: '1rem', // 16px
        medium: '1.25rem', // 20px
        large: '1.5rem', // 24px
        title: '2rem', // 32px
    },
    fontWeights: {
        normal: 400,
        bold: 700,
    },
    spacings: {
        small: '0.5rem', // 8px
        medium: '1rem', // 16px
        large: '2rem', // 32px
        xlarge: '4rem', // 64px
    },
    borderRadius: '0.25rem', // 4px
    transition: '0.3s ease-in-out',
};

// Light theme values
export const lightTheme = {
    ...sharedTheme,
    colors: {
        primary: '#04ED04',
        secondary: '#B80C09',
        background: '#F7FFF7',
        surface: '#D7CDCC',
        onSurface: '#424342',
        text: '#14110F',
        error: '#B80C09',
        onPrimary: '#F7FFF7',
    },
};

// Dark theme values
export const darkTheme = {
    ...sharedTheme,
    colors: {
        primary: '#033C02',
        secondary: '#6B0205',
        background: '#242423',
        surface: '#434343',
        onSurface: '#D7CDCC',
        text: '#F7FFF7',
        error: '#FF5757',
        onPrimary: '#000000',
    },
};