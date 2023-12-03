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

const ExplorePage = ({ postData = [] }) => {
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

export default ExplorePage;

