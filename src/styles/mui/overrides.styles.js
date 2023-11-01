export const overrides = {
    MuiAccordion: {
        styleOverrides: {
            root: {
                background: 'none',
                boxShadow: 'none',
                '&$expanded': {
                    background: 'none',
                },
                '&:before': {
                    display: 'none',
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
    MuiMenu: {
        styleOverrides: {
            paper: ({ theme }) => ({
                backgroundColor: theme.palette.background.default,
                zIndex: 2,
                boxShadow: 'rgba(255, 255, 255, 0.2) 0px 0px 6px 2px, rgba(255, 255, 255, 0.15) 0px 3px 3px -2px',

                "&::before": {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    bottom: -10,
                    right: 14,
                    width: 10,
                    height: 10,
                    backgroundColor: theme.palette.background.default,
                    transform: 'translateY(-50%) rotate(45deg)',
                    boxShadow: 'rgba(255, 255, 255, 0.2) 3px 3px 6px -1px, rgba(255, 255, 255, 0.15) 2px 2px 3px -5px',
                    zIndex: 1,
                },
            }),
        },
    },
}