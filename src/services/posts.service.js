import { databases, storage } from './appwrite';
import { FIT_SOCIAL_DATABASE_ID, POSTS_COLLECTION_ID, USERS_COLLECTION_ID } from './config';
import { Permission, Role, ID } from 'appwrite';

export const createPost = async (postContent, userId) => {
    try {
        const document = await databases.createDocument(
            FIT_SOCIAL_DATABASE_ID,
            POSTS_COLLECTION_ID,
            ID.unique(),
            postContent,
            [
                Permission.read(Role.any()),
                Permission.write(Role.user(userId)),
            ]
        );
        return document;
    } catch (error) {
        throw error;
    }
};

export const uploadImage = async (file) => {
    try {
        const response = await storage.createFile(
            'unique()',
            file,
            ['*'],
            []
        );
        return response;
    } catch (error) {
        throw error;
    }
};

export const getPosts = async () => {
    try {
        const postsList = await databases.listDocuments(FIT_SOCIAL_DATABASE_ID, POSTS_COLLECTION_ID);

        return postsList;
    } catch (error) {
        throw error;
    }
};

export const getPostById = async (postId) => {
    try {
        const post = await databases.getDocument(FIT_SOCIAL_DATABASE_ID, POSTS_COLLECTION_ID, postId);
        const user = await databases.getDocument(FIT_SOCIAL_DATABASE_ID, USERS_COLLECTION_ID, post.userId);
        return { ...post, user };
    } catch (error) {
        throw error;
    }
};

export const updatePost = async (postId, postContent, userId) => {
    try {
        const document = await databases.updateDocument(
            FIT_SOCIAL_DATABASE_ID,
            POSTS_COLLECTION_ID,
            postId,
            postContent,
            [
                Permission.read(Role.any()),
                Permission.write(Role.user(userId)),
            ]
        );
        return document;
    } catch (error) {
        throw error;
    }
};

export const deletePost = async (postId, userId) => {
    try {
        await databases.deleteDocument(
            FIT_SOCIAL_DATABASE_ID,
            POSTS_COLLECTION_ID,
            postId,
            [
                Permission.write(Role.user(userId)),
            ]
        );
        return postId; // Return the id of the deleted post
    } catch (error) {
        throw error;
    }
};

export const addLike = async (postId, userId) => {
    try {
        // Fetch the current post
        const post = await databases.getDocument(FIT_SOCIAL_DATABASE_ID, POSTS_COLLECTION_ID, postId);

        // Add userId to likeIds and increment likes
        const updatedLikeIds = [...post.likeIds, userId];
        const updatedLikes = post.likes + 1;

        // Update the post
        const updatedPost = await databases.updateDocument(
            FIT_SOCIAL_DATABASE_ID,
            POSTS_COLLECTION_ID,
            postId,
            { likeIds: updatedLikeIds, likes: updatedLikes }
        );

        return updatedPost;
    } catch (error) {
        throw error;
    }
};

export const removeLike = async (postId, userId) => {
    try {
        // Fetch the current post
        const post = await databases.getDocument(FIT_SOCIAL_DATABASE_ID, POSTS_COLLECTION_ID, postId);

        // Remove userId from likeIds and decrement likes
        const updatedLikeIds = post.likeIds.filter(id => id !== userId);
        const updatedLikes = post.likes - 1;

        // Update the post
        const updatedPost = await databases.updateDocument(
            FIT_SOCIAL_DATABASE_ID,
            POSTS_COLLECTION_ID,
            postId,
            { likeIds: updatedLikeIds, likes: updatedLikes }
        );

        return updatedPost;
    } catch (error) {
        throw error;
    }
};