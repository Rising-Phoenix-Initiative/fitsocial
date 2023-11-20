import React from 'react';
import {
    DashboardContainer,
    SideContent,
} from './dashboard.styles';
import Navigation from './components/navigation/navigation.components';
import { Box } from '@mui/material';
import Widgets from './components/widgets/widgets.component';
import MainContent from './components/main/main-content.component';

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
    return (
        <DashboardContainer>
            <Navigation />
            <Box sx={{
                display: 'flex',
                flex: 1,
                width: 'calc(100% - 320px)',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <MainContent />
                <SideContent>
                    <Widgets user={userData} />
                </SideContent>
            </Box>
        </DashboardContainer>
    );
};

export default Dashboard;