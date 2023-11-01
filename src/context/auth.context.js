import React, { createContext, useState, useContext, useEffect } from 'react';

// Initial context state
const initialAuthState = {
    isAuthenticated: true,
    user: null,
};

// Create the context
const AuthContext = createContext({
    ...initialAuthState,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Here you can fetch authentication status from local storage or API
        // For example:
        // const storedUser = localStorage.getItem('user');
        // if (storedUser) {
        //     setIsAuthenticated(true);
        //     setUser(JSON.parse(storedUser));
        // }
    }, []);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        // Optionally save user data in local storage or cookie
        // localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        // Optionally clear user data from local storage or cookie
        // localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
