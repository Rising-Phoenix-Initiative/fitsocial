import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkCurrentUser, createUser, loginUser, logoutUser } from '../services/users.service';
import { useCallback } from 'react';

const initialAuthState = {
    isAuthenticated: false,
    user: {},
};

const AuthContext = createContext({
    ...initialAuthState,
    login: () => { },
    logout: () => { },
    signup: () => { },
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const [authIsLoading, setLoading] = useState(true);
    const navigate = useNavigate();

    const checkSession = useCallback(async () => {
        setLoading(true);
        try {
            const data = await checkCurrentUser();
            if (data.session && data.user) {
                setTimeout(() => {
                    setLoading(false);
                    setIsAuthenticated(true);
                    setUser(data.user);
                }, 2000);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.error('Check Session Error:', error);
            setLoading(false);
        }
    }, []);

    const signup = async (userData) => {
        try {
            const { userCreationResponse, documentCreationResponse } = await createUser(userData);
            if (!!userCreationResponse && !!documentCreationResponse) {
                await login(userData.email, userData.password);
            }
            else {
                console.log("future error handling here")
            }
        } catch (error) {
            console.error('Signup Error:', error);
        }
    };


    const login = async (email, password) => {
        setLoading(true);
        try {
            const session = await loginUser(email, password);
            localStorage.setItem('session', JSON.stringify(session));
            checkSession();
            navigate('/');
        } catch (error) {
            console.error('Login Error:', error);
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
    }, [checkSession]);


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