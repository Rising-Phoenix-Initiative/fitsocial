import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { usePosts } from '../../context/posts.context';

const NoPostsYet = () => {
    const { openNewPost } = usePosts();

    return (
        <Box my={10} sx={{ textAlign: 'center', p: 3 }}>
            <ChatBubbleOutlineIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
            <Typography variant="h6" sx={{ mt: 2 }}>
                There are no posts yet. Be the first one!
            </Typography>
            <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={openNewPost}
            >
                Create a Post
            </Button>
        </Box>
    );
};

export default NoPostsYet;