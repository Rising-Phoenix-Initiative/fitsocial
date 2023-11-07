import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
            <CircularProgress size={100} />
        </Box>
    )
};

export default Loader;