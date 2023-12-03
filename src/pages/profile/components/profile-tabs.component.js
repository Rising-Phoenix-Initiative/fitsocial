import React, { useState } from 'react';
import { Box, Tab, Tabs, List, Divider } from '@mui/material';
import Post from '../../../components/post/post.component';

const ProfileTabs = ({ posts, likes }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Posts" />
                <Tab label="Likes" />
            </Tabs>
            <Divider />
            {value === 0 && (
                <List>
                    {posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </List>
            )}
            {value === 1 && (
                <List>
                    {likes.map((like) => (
                        <Post key={like.id} post={like} /> // Replace with actual "Like" component
                    ))}
                </List>
            )}
        </Box>
    );
};

export default ProfileTabs;