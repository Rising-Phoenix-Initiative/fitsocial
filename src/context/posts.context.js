import React, { createContext, useState, useEffect } from 'react';
import * as postService from '../services/posts.service';

export const PostsContext = createContext();

const PostsProvider = ({ children }) => {
    const [newPostOpen, setNewPostOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [postsLoading, setPostsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const openNewPost = () => {
        setNewPostOpen(true);
    };

    const closeNewPost = () => {
        setNewPostOpen(false);
    };

    const fetchPosts = async () => {
        try {
            const fetchedPosts = await postService.getPosts();
            setPosts(fetchedPosts.documents.reverse());
            setPostsLoading(false);
        } catch (err) {
            setError(err.message);
            setPostsLoading(false);
        }
    };

    const createPost = async (postData, userId) => {
        try {
            const newPost = await postService.createPost(postData, userId);
            setPosts([newPost, ...posts]);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchPostById = async (postId) => {
        try {
            const fetchedPosts = await postService.getPostById([postId]);
            setPosts(fetchedPosts);
        } catch (err) {
            setError(err.message);
        }
    };

    const updatePost = async (postId, postContent, userId) => {
        try {
            const updatedPost = await postService.updatePost(postId, postContent, userId);
            setPosts(posts.map(post => post.$id === postId ? updatedPost : post));
        } catch (err) {
            setError(err.message);
        }
    };

    const deletePost = async (postId, userId) => {
        try {
            await postService.deletePost(postId, userId);
            setPosts(posts.filter(post => post.$id !== postId));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <PostsContext.Provider value={{
            newPostOpen,
            openNewPost,
            closeNewPost,
            posts,
            postsLoading,
            createPost,
            fetchPostById,
            updatePost,
            deletePost,
            error
        }}>
            {children}
        </PostsContext.Provider>
    );
};

export const usePosts = () => React.useContext(PostsContext);

export default PostsProvider;