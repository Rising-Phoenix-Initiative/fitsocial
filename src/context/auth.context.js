import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkCurrentUser, createUser, loginUser, logoutUser } from '../services/users.service';

const initialAuthState = {
    isAuthenticated: false,
    user: null,
};

const AuthContext = createContext({
    ...initialAuthState,
    login: () => { },
    logout: () => { },
    signup: () => { },
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [authIsLoading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const session = localStorage.getItem('session');
        if (session) {
            setTimeout(() => {
                setLoading(false);
                setIsAuthenticated(true);
                setUser(JSON.parse(session));
            }, 2000);
        } else {
            setLoading(false);
        }
    }, []);

    const signup = async (userData) => {
        try {
            const { userCreationResponse, documentCreationResponse } = await createUser(userData);
            console.log(userCreationResponse);
            console.log(documentCreationResponse);

            await login(userData.email, userData.password);
        } catch (error) {
            console.error('Signup Error:', error);
        }
    };


    const login = async (email, password) => {
        setLoading(true);
        try {
            const session = await loginUser(email, password);
            console.log(session);
            localStorage.setItem('session', JSON.stringify(session));
            setIsAuthenticated(true);
            setUser(session);
            setLoading(false);
            navigate('/');
        } catch (error) {
            console.error('Login Error:', error);
        }
    };

    const checkSession = async () => {
        try {
            const session = await checkCurrentUser();
            console.log('Session:', session);
            setIsAuthenticated(true);
            setUser(session);
        } catch (error) {
            console.error('Check Session Error:', error);
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem('session');
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await logoutUser();
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem('session');
            setLoading(false);
            navigate('/');
        } catch (error) {
            console.error('Logout Error:', error);
        }
    };

    // Check the session on app start
    useEffect(() => {
        checkSession();
    }, []);

    return (
        <AuthContext.Provider value={{ authIsLoading, isAuthenticated, user, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;