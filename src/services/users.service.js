import { account, databases } from './appwrite';
import { FIT_SOCIAL_DATABASE_ID, USERS_COLLECTION_ID } from './config'
import { ID, Permission, Role } from 'appwrite';

// Create a new user both in the account and in the user collection
export const createUser = async (userData) => {
    try {
        const userCreationResponse = await account.create('unique()', userData.email, userData.password, userData.name);
        console.log("userCreationResponse", userCreationResponse);
        const userCollectionData = {
            // ... match the structure of your user collection
            name: userData.name,
            username: userData.username,
            birthdate: userData.birthdate,
            gender: userData.gender,
        };
        console.log("userCollectionData", userCollectionData);

        const documentCreationResponse = await databases.createDocument(
            FIT_SOCIAL_DATABASE_ID,
            USERS_COLLECTION_ID,
            ID.unique(),
            userCollectionData,
            // Set permissions if needed
            [Permission.read(Role.any())],
            [Permission.write(Role.user(userCreationResponse.$id))],
        );

        return { userCreationResponse, documentCreationResponse };
    } catch (error) {
        throw error; // Handle the error where this function is called
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

// Check current session
export const checkCurrentUser = async () => {
    try {
        const session = await account.getSession('current');
        return session;
    } catch (error) {
        throw error;
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