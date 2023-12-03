import { account } from './appwrite';
import { getUser } from './users.service';

// Login a user
export const loginUser = async (email, password) => {
    try {
        const session = await account.createEmailSession(email, password);
        return session;
    } catch (error) {
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