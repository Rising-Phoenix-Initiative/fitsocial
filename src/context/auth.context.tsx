import React, { createContext, useState, useContext, useEffect, ReactNode, FC } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createUser } from '../services/users.service';
import  { UserType } from '../features/user/_types/User';
// import { getCurrentSession, login } from '../features/auth/authService';
// import { LoginType } from '../features/auth/_types/Login';
// import { SignUpType } from '../features/auth/_types/SignUp';

type AuthContextType = {
    authenticating: boolean,
    isAuthenticated: boolean,
    user: UserType|null,
}

type AuthProviderProps = {
    children: ReactNode
}

const initialAuthState: AuthContextType = {
    authenticating: false,
    isAuthenticated: false,
    user: null,
};

export const AuthContext = createContext<AuthContextType>(initialAuthState);

export const AuthProvider: FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserType|null>(null);
    // const navigate = useNavigate();
    // const toggleLoading = () => setLoading((prev) => !prev)
    // const handleUserUpdate = (user: UserType) => {
    //     console.log({user})
    //     setIsAuthenticated((prev) => !prev);
    //     setUser(user);
    // }

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

    // const checkSession = async () => {
    //     try {
    //         const session = await getCurrentSession();
    //         console.log('Session:', session);

    //         if (!!session && (!user || !isAuthenticated)) {
    //             setIsAuthenticated(true);
    //             setUser(User(session));
    //         }
    //     } catch (error) {
    //         console.error('Check Session Error:', error);
    //         setIsAuthenticated(false);
    //         setUser(null);
    //         localStorage.removeItem('session');
    //     }
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
        <AuthContext.Provider value={{ authenticating: loading, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>)

};

export const useAuth = () => {
    return useContext(AuthContext);
};

