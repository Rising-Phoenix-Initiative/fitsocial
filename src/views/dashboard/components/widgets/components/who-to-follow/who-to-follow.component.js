import React from 'react';
import { Typography, Divider, Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Button } from '@mui/material';
import { WidgetContainer } from '../../widgets.styles';
import { getInitials } from '../../../../../../utils/get-initials.util';

// Example data for suggested users
const suggestedUsers = [
    { name: 'Jim Halper', username: '@jim', avatarUrl: '/path/to/avatar1.jpg' },
    { name: 'John Wick', username: '@john', avatarUrl: '/path/to/avatar2.jpg' },
    { name: 'Jane Monroe', username: '@jane', avatarUrl: '/path/to/avatar3.jpg' },
    // Add more suggested users here
];

const WhoToFollow = () => {
    return (
        <WidgetContainer>
            <Typography sx={{ p: '20px' }} variant="h5" color="textPrimary">Who To Follow</Typography>
            <Divider />
            <List sx={{ width: '100%' }}>
                {suggestedUsers.map((user, index) => (
                    <React.Fragment key={user.username}>
                        {index > 0 && <Divider variant="inset" component="li" />}
                        <ListItem sx={{ p: '10px 20px' }}>
                            <ListItemAvatar>
                                <Avatar>{getInitials(user.name)}</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={user.name} secondary={user.username} />
                            <Button variant="outlined" size="small">Follow</Button>
                        </ListItem>
                    </React.Fragment>
                ))}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'center', p: '10px 20px' }}>
                <Button size="small">Show more</Button>
            </Box>

        </WidgetContainer>
    )
}

export default WhoToFollow;