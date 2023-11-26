import { account, databases } from './appwrite';
import { FIT_SOCIAL_DATABASE_ID, USERS_COLLECTION_ID } from './config'
import { Permission, Role } from 'appwrite';

// Create a new user both in the account and in the user collection
export const createUser = async (userData) => {
    try {
        const userCreationResponse = await account.create('unique()', userData.email, userData.password, userData.name);
        const userCollectionData = {
            name: userData.name,
            username: userData.username,
            birthdate: userData.birthdate,
            gender: userData.gender,
        };

        const documentCreationResponse = await databases.createDocument(
            FIT_SOCIAL_DATABASE_ID,
            USERS_COLLECTION_ID,
            userCreationResponse.$id,
            userCollectionData,
            [Permission.read(Role.any())],
            [Permission.write(Role.user(userCreationResponse.$id))],
        );

        return { userCreationResponse, documentCreationResponse };
    } catch (error) {
        throw error;
    }
};

// Login a user
export const loginUser = async (email, password) => {
    try {
        const session = await account.createEmailSession(email, password);
        return session;
    } catch (error) {
        throw error;
    }
};

// Get a user by document ID
export const getUser = async (userId) => {
    try {
        const userDocument = await databases.getDocument(
            FIT_SOCIAL_DATABASE_ID,
            USERS_COLLECTION_ID,
            userId,
        );

        return userDocument;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
    }
};

// Check current session and get user data
export const checkCurrentUser = async () => {
    try {
        const session = await account.getSession('current');
        const userDocument = await getUser(session.userId)

        return {
            session: session,
            user: userDocument
        };
    } catch (error) {
        console.error('Error checking current user:', error);
    }
};

// Logout the current user
export const logoutUser = async () => {
    try {
        await account.deleteSession('current');
        return true;
    } catch (error) {
        throw error;
    }
};