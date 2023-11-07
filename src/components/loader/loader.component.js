import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loader = ({ sx, size = 100 }) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            ...sx
        }}>
            <CircularProgress size={size} />
        </Box>
    )
};

export default Loader;