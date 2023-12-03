import React, { createContext, useState, useContext, useEffect, ReactNode, FC } from 'react';
import  User, { UserType } from '../features/user/_types/User';
import useAuthProvider from '../features/auth/_hooks/useAuthProvider';
import { Models } from 'appwrite';

export type AuthContextType = {
    authenticating: boolean,
    currentSession?: Models.Session|null
    isAuthenticated: boolean,
    user?: UserType|Models.Session|null,
    login: () => void,
    logout: () => void,
    signup: () => void,
}

type AuthProviderProps = {
    children: ReactNode
}

const initialAuthState: AuthContextType = {
    authenticating: false,
    currentSession: null,
    isAuthenticated: false,
    user: null,
    login: () => { },
    logout: () => { },
    signup: () => { },
};

export const AuthContext = createContext<AuthContextType>(initialAuthState);

export const AuthProvider: FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
    
    const authState = useAuthProvider(initialAuthState)
    // Below is the content from the JS instance of auth.context which will be needed for the handle updates
   
    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>)

};

export const useAuth = () => {
    return useContext(AuthContext);
};

