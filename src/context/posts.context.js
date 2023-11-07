import React, { createContext, useState, useEffect } from 'react';
import * as postService from '../services/posts.service';

export const PostsContext = createContext();

const PostsProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const fetchedPosts = await postService.getPosts();
            setPosts(fetchedPosts);
        } catch (err) {
            setError(err.message);
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
        <PostsContext.Provider value={{ posts, createPost, fetchPostById, updatePost, deletePost, error }}>
            {children}
        </PostsContext.Provider>
    );
};

// Custom hook to use the posts context
export const usePosts = () => React.useContext(PostsContext);

export default PostsProvider;