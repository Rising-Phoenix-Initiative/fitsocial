import React from 'react';
import Post from '../../components/post/post.component';
import styled from 'styled-components';
import { Box } from '@mui/material';

const PostsList = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`

// Mock data: array of post objects
const postData = [
    { id: 1, content: "This is the first post content", likes: 10, comments: 2 },
    { id: 2, content: "Here's a post about an exciting event coming up", likes: 22, comments: 4 },
    { id: 3, content: "Feeling great about recent progress!", likes: 34, comments: 8 },
    { id: 4, content: "This is the first post content", likes: 10, comments: 2 },
    { id: 5, content: "Here's a post about an exciting event coming up", likes: 22, comments: 4 },
    { id: 6, content: "Feeling great about recent progress!", likes: 34, comments: 8 },
    { id: 7, content: "This is the first post content", likes: 10, comments: 2 },
    { id: 8, content: "Here's a post about an exciting event coming up", likes: 22, comments: 4 },
    { id: 9, content: "Feeling great about recent progress!", likes: 34, comments: 8 },
    { id: 10, content: "This is the first post content", likes: 10, comments: 2 },
    { id: 11, content: "Here's a post about an exciting event coming up", likes: 22, comments: 4 },
    { id: 12, content: "Feeling great about recent progress!", likes: 34, comments: 8 },
    { id: 13, content: "This is the first post content", likes: 10, comments: 2 },
    { id: 14, content: "Here's a post about an exciting event coming up", likes: 22, comments: 4 },
    { id: 13, content: "Feeling great about recent progress!", likes: 34, comments: 8 },
    // Add as many posts as you like for testing purposes
];

const HomePage = () => {
    return (
        <PostsList>
            {/* Map through postData to render Post components */}
            {postData.map(post => (
                <Post
                    key={post.id}
                    content={post.content}
                    likes={post.likes}
                    comments={post.comments}
                />
            ))}
        </PostsList>
    )
}

export default HomePage;

