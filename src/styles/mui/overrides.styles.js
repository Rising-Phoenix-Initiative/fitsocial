export const overrides = {
    MuiAccordion: {
        styleOverrides: {
            root: {
                background: 'none',
                boxShadow: 'none',
                '&$expanded': {
                    background: 'none',
                },
            },
        },
    },
    MuiAccordionSummary: {
        styleOverrides: {
            root: {
                background: 'none',
                '&$expanded': {
                    background: 'none',
                },
            },
        },
    },
    MuiAccordionDetails: {
        styleOverrides: {
            root: {
                background: 'none',
            },
        },
    },
    MuiButton: {
        styleOverrides: {
            root: { // This targets the text inside the button
                textTransform: 'none', // Prevents uppercase transformation
            },
        },
    },

}