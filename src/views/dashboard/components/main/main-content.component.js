import React from 'react';
import { MainContentContainer, MainContentTitle } from './main-content.styles';
import { Typography } from '@mui/material';
import { SafeArea } from '../../dashboard.styles';
import DashboardRoutes from '../../../../routes/DashboardRoutes';
import { capitalizeFirstLetter } from '../../../../utils/capitalize.util';
import { useLocation } from 'react-router-dom';

const MainContent = () => {
    const location = useLocation();
    const segment = location.pathname.split('/')[1] || '';  // Extracts the first segment, e.g. "home" or "explore"
    const title = capitalizeFirstLetter(segment);

    return (
        <MainContentContainer>
            <MainContentTitle>
                <Typography variant="h4" component="h2">
                    {title}
                </Typography>
            </MainContentTitle>
            <SafeArea>
                <DashboardRoutes />
            </SafeArea>
        </MainContentContainer>
    )
};

export default MainContent;