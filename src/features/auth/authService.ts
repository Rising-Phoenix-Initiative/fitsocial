import { Models } from 'appwrite';
import { account } from '../../services/appwrite';

import User, { UserType } from '../user/_types/User';
import { LoginType } from './_types/Login';
import { SignUpType } from './_types/SignUp';
import { createUser, getUser } from '../../services/users.service';


export async function login({email, password}: LoginType): Promise<UserType> {
    console.log('in login func')
    try {
        console.log('attempting to get session with: ', {email, password})
        const session = await account.createEmailSession(email, password);
        console.log('setting localStorage')
        localStorage.setItem('session', JSON.stringify(session));
        
        console.log('returning User')
        return User(session);
    } catch (error) {
        throw error;
    }
}

export async function logout() {
    try {
        await account.deleteSession('current');
        localStorage.removeItem('session')
        return true;
    } catch (error) {
        throw error;
    }
};

export async function getCurrentSession(): Promise<Models.Session> {
    try {
        const session = await account.getSession('current');
        return session;
    } catch (error) {
        throw error;
    }
};

export async function signup(userData: SignUpType){
        try {
            const { userCreationResponse, documentCreationResponse } = await createUser(userData);
            console.log(userCreationResponse);
            console.log(documentCreationResponse);

            await login({ email: userData.email, password: userData.password});
        } catch (error) {
            console.error('Signup Error:', error);
        }
}

export async function checkSession() {
    let sessionState = false

         try {
            const session = await getCurrentSession();
            console.log('Session:', session);

            sessionState = true
        } catch (error) {
            console.error('Check Session Error:', error);

            localStorage.removeItem('session');
        }
        return sessionState
}

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