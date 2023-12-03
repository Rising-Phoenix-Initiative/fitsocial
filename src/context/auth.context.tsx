import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    ReactNode,
    FC,
} from "react";
import User, { UserType } from "../features/user/_types/User";
import useAuthProvider from "../features/auth/_hooks/useAuthProvider";
import { Models } from "appwrite";

type AuthProviderProps = {
    children: ReactNode;
};

export type AuthContextType = {
    authenticating: boolean;
    isAuthenticated: boolean;
    user: UserType | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    signup: (userData: UserType) => void;
};

// Initial State
const initialAuthState: AuthContextType = {
    authenticating: false,
    isAuthenticated: false,
    user: null,
    login: () => {},
    logout: () => {},
    signup: () => {},
};

// Context
export const AuthContext = createContext<AuthContextType>(initialAuthState);

// AuthProvider Component
const AuthProvider: FC<any> = ({ children }) => {
    console.log("initialAuthState", initialAuthState);
    const authState = useAuthProvider(initialAuthState);
    console.log("authState", authState);

    return (
        <AuthContext.Provider value={{ ...authState }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
