import React from 'react';
import Post from '../../components/post/post.component';
import styled from 'styled-components';
import { Box } from '@mui/material';
import { usePosts } from '../../context/posts.context';
import NoPostsYet from '../../components/post/no-posts-yet.component';

const PostsList = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`

const HomePage = () => {
    const { posts } = usePosts();

    if (posts.length === 0) {
        return (
            <NoPostsYet />
        )
    }

    else {
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
}

export default HomePage;

