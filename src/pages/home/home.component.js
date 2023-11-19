import React from 'react';
import Post from '../../components/post/post.component';
import styled from 'styled-components';
import { Box } from '@mui/material';
import { usePosts } from '../../context/posts.context';

const PostsList = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`

const HomePage = () => {
    const { posts } = usePosts();
    return (
        <PostsList>
            {/* Map through postData to render Post components */}
            {posts.map(post => {
                return (
                    <Post post={post} />
                )
            })}
        </PostsList>
    )
}

export default HomePage;

