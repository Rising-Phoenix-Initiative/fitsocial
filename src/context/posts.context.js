import React, { createContext, useState, useEffect } from 'react';
import * as postService from '../services/posts.service';

export const PostsContext = createContext();

const PostsProvider = ({ children }) => {
    const [newPostOpen, setNewPostOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [postsLoading, setPostsLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
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
        setSubmitting(true);
        try {
            const newPost = await postService.createPost(postData, userId);
            setPosts([newPost, ...posts]);
        } catch (err) {
            setError(err.message);
        }
        setSubmitting(false);
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

    const addLikeToPost = async (postId, userId) => {
        try {
            const updatedPost = await postService.addLike(postId, userId);
            // Update the local state to reflect the new like
            setPosts(posts.map(post => post.id === postId ? updatedPost : post));
        } catch (error) {
            console.error(error);
        }
    };

    const removeLikeFromPost = async (postId, userId) => {
        try {
            const updatedPost = await postService.removeLike(postId, userId);
            // Update the local state to reflect the removed like
            setPosts(posts.map(post => post.id === postId ? updatedPost : post));
        } catch (error) {
            console.error(error);
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
            submitting,
            fetchPostById,
            updatePost,
            deletePost,
            addLikeToPost,
            removeLikeFromPost,
            error
        }}>
            {children}
        </PostsContext.Provider>
    );
};

export const usePosts = () => React.useContext(PostsContext);

export default PostsProvider;