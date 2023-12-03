import React from 'react';
import { Typography, List, ListItem, Divider, Box } from '@mui/material';
import { Stat, StyledLinearProgress } from './user-stats.styles';
import { WidgetContainer } from '../../widgets.styles';

const user = {
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

const UserStats = () => {
    return (
        <WidgetContainer>
            <Typography sx={{ p: '20px' }} variant="h5" color="textPrimary">My Stats</Typography>
            <Divider />
            <Box sx={{ display: 'flex', flexDirection: 'column', p: '20px' }}>
                <Stat color="textSecondary">Workouts: {user.workouts}</Stat>
                <Stat color="textSecondary">Achievements: {user.achievements.join(', ')}</Stat>
                <Typography variant="h6" color="textPrimary">Goal Progress:</Typography>
                <StyledLinearProgress variant="determinate" value={user.goalProgress} />
                <Typography variant="h6" color="textPrimary">Recent Activities:</Typography>
                <List>
                    {user.recentActivities.map((activity, index) => (
                        <ListItem key={index} color="textSecondary">{activity}</ListItem>
                    ))}
                </List>
            </Box>
        </WidgetContainer>
    )
}

export default UserStats;