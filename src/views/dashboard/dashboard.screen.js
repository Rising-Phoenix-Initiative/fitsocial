import React from 'react';
import {
    DashboardContainer,
    MainContent,
    SideContent,
    SafeArea,
    SearchBar,
    SearchContainer,
    MainContentTitle
} from './dashboard.styles';
import Navigation from '../../components/navigation/navigation.components';
import UserStats from './components/user-stats/user-stats.component';
import { Box, IconButton, InputBase, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import DashboardRoutes from '../../routes/DashboardRoutes';
import { useLocation } from 'react-router-dom';
import { capitalizeFirstLetter } from '../../utils/capitalize.util';

const userData = {
    profilePicture: 'https://via.placeholder.com/150',
    name: 'John Doe',
    workouts: 150,
    achievements: ['5k Runner', '100 Workouts', 'Marathon Finisher'],
    goalProgress: 75, // This represents the percentage of the goal achieved.
    recentActivities: [
        'Completed a 10k run',
        'Joined "Summer Fitness Challenge"',
        'Achieved "5k Runner" badge',
        'Posted a new workout routine',
        'Shared a diet tip'
    ]
};


const Dashboard = () => {
    const location = useLocation();
    const segment = location.pathname.split('/')[1] || '';  // Extracts the first segment, e.g. "home" or "explore"
    const title = capitalizeFirstLetter(segment);

    return (
        <DashboardContainer>
            <Navigation />
            <Box sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <MainContent>
                    <MainContentTitle>
                        <Typography variant="h4" component="h2">
                            {title}
                        </Typography>
                    </MainContentTitle>
                    <SafeArea>
                        <DashboardRoutes />
                    </SafeArea>
                </MainContent>
                <SideContent>
                    <SearchContainer>
                        <SearchBar>
                            <IconButton size="small">
                                <Search />
                            </IconButton>
                            <InputBase placeholder="Search..." />
                        </SearchBar>
                    </SearchContainer>
                    <UserStats user={userData} />
                </SideContent>
            </Box>
        </DashboardContainer>
    );
};

export default Dashboard;