import { createTheme } from '@mui/material/styles';
import { overrides } from './overrides.styles';

export const createMuiTheme = (customTheme) => {
    return createTheme({
        palette: {
            mode: customTheme.mode,
            primary: {
                main: customTheme.colors.primary, // primary color
                contrastText: customTheme.colors.onPrimary, // text color on primary colored backgrounds
            },
            secondary: {
                main: customTheme.colors.secondary,
            },
            error: {
                main: customTheme.colors.error,
            },
            background: {
                default: customTheme.colors.background, // background color of the app
                paper: customTheme.colors.surface, // background color of paper-based components
            },
            text: {
                primary: customTheme.colors.text, // primary text color
                secondary: customTheme.colors.onSurface, // secondary text color, used against surface background
            },
            iconHover: {
                heart: '#e10f0b',  // Red
                comment: '#3498db', // Blue
                general: customTheme.colors.primary, // primary color
            },
        },
        typography: {
            fontFamily: customTheme.fonts.primary,
            // fontSize: customTheme.fontSizes.medium, // Set globally, specific components might override
            fontWeightRegular: customTheme.fontWeights.normal,
            fontWeightBold: customTheme.fontWeights.bold,
        },
        shape: {
            borderRadius: customTheme.borderRadius,
        },
        components: overrides
    });
};
