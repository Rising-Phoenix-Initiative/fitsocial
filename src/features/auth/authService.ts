import { account } from '../../services/appwrite';
import { createUser } from '../../services/users.service';
import User, { UserType } from '../user/_types/User';
import { LoginType } from './_types/Login';
import { SignUpType } from './_types/SignUp';


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

export async function getCurrentSession() {
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
