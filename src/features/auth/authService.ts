import { account } from '../../services/appwrite';
import User, { UserType } from '../user/_types/User';
import { LoginType } from './_types/Login';

export async function login({email, password}: LoginType): Promise<UserType> {
    try {
        const session = await account.createEmailSession(email, password);
        localStorage.setItem('session', JSON.stringify(session));
        
        return User(session);
    } catch (error) {
        throw error;
    }
}

export async function logout() {
    try {
        await account.deleteSession('current');
        return true;
    } catch (error) {
        throw error;
    }
};

export async function getCurrentSession() {
    try {
        const session = await account.getSession('current');
        return session;
    } catch (error) {
        throw error;
    }
};