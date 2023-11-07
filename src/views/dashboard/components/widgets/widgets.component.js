import * as React from 'react';
import { Typography, List, ListItem, Divider, Box, IconButton, InputBase } from '@mui/material';
import { SearchBar, SearchContainer, Stat, StatsContainer, StyledLinearProgress } from './widgets.styles';
import { Search } from '@mui/icons-material';

const Widgets = ({ user }) => {
  return (
    <>
      <SearchContainer>
        <SearchBar>
          <IconButton size="small">
            <Search />
          </IconButton>
          <InputBase placeholder="Search..." />
        </SearchBar>
      </SearchContainer>
      <StatsContainer>
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
      </StatsContainer>
    </>
  );
};

export default Widgets;