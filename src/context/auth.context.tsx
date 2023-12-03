import React, { createContext, useState, useContext, useEffect, ReactNode, FC } from 'react';
import  User, { UserType } from '../features/user/_types/User';
import useAuthProvider from '../features/auth/_hooks/useAuthProvider';
import { Models } from 'appwrite';

export type AuthContextType = {
    authenticating: boolean,
    currentSession?: Models.Session|null
    isAuthenticated: boolean,
    user?: UserType|Models.Session|null,
}

type AuthProviderProps = {
    children: ReactNode
}

const initialAuthState: AuthContextType = {
    authenticating: false,
    currentSession: null,
    isAuthenticated: false,
    user: null,
};

export const AuthContext = createContext<AuthContextType>(initialAuthState);

export const AuthProvider: FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
    const {authenticating, currentSession, isAuthenticated, user} = useAuthProvider()
    // TODO: I think we need a user lookup that's less expensive and with the ability to control more features to our app.
    
    // const navigate = useNavigate();
    // const toggleLoading = () => setLoading((prev) => !prev)
    // const handleUserUpdate = (user: UserType) => {
    //     console.log({user})
    //     setIsAuthenticated((prev) => !prev);
    //     setUser(user);
    // }
    
    // async function authenticateUser(userData: LoginType, toggleLoading: Function, handleUserUpdate: Function) {
    //     const { email, password } = userData
    //     const navigate = useNavigate();
    //     toggleLoading()
        
    //     try {
    //         const user = await login({email, password});
    //         handleUserUpdate(user)
    //     } catch (error) {
    //         console.error('Login Error:', error);
    //     } finally {
    //         toggleLoading()
    //         navigate('/');
    //     }
    // }

    // const signup = async (userData: SignUpType) => {
    //     try {
    //         const { userCreationResponse, documentCreationResponse } = await createUser(userData);
    //         console.log(userCreationResponse);
    //         console.log(documentCreationResponse);

    //         await login({ email: userData.email, password: userData.password});
    //     } catch (error) {
    //         console.error('Signup Error:', error);
    //     }
    // };

    // const handleLogin = async ({email, password}: LoginType) => {
    //     authenticateUser({email, password}, toggleLoading, handleUserUpdate)
    // };

    // const logout = async () => {
    //     setLoading(true);
    //     try {
    //         await logout();
    //         setIsAuthenticated(false);
    //         setUser(null);
    //         localStorage.removeItem('session');
    //         setLoading(false);
    //         navigate('/');
    //     } catch (error) {
    //         console.error('Logout Error:', error);
    //     }
    // };
   
    return (
        <AuthContext.Provider value={{ authenticating, currentSession, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>)

};

export const useAuth = () => {
    return useContext(AuthContext);
};

