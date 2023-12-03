import React from 'react';
import { Box, Avatar, Typography, Button } from '@mui/material';

const ProfileHeader = ({ userData }) => {
    return (
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column' }}>
                <Avatar
                    sx={{ width: 56, height: 56 }}
                    src={userData.avatar}
                    alt={userData.name}
                />
                <Typography variant="h6">{userData.name}</Typography>
                <Typography variant="subtitle2">@{userData.username}</Typography>
                <Typography variant="body2">Joined {userData.joinedAt}</Typography>
                <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
                    <Typography variant="body2">
                        <strong>{userData.followingCount}</strong> Following
                    </Typography>
                    <Typography variant="body2">
                        <strong>{userData.followersCount}</strong> Followers
                    </Typography>
                </Box>
            </Box>
            <Box>
                <Button variant="outlined" sx={{ textTransform: 'none' }}>
                    Edit Profile
                </Button>
            </Box>
        </Box>
    );
};

export default ProfileHeader;