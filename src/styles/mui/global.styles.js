import * as React from 'react';
import { GlobalStyles } from '@mui/material';

const MuiGlobalStyles = () => (
    <GlobalStyles styles={{
        // This targets the internal state of the input during autofill
        'input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active': {
            transitionDelay: '9999s', // Prevent the rapid autofill color flash
            transitionProperty: 'background-color, color',
            // You can use your theme's color here, or transparent if you want the input's background to remain unchanged
            backgroundColor: 'background.default !important', // Use !important to override browser's autofill style
            color: 'primary.main !important', // Replace with appropriate text color from your theme
        },
    }} />
);

export default MuiGlobalStyles;