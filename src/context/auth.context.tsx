import React, { createContext, ReactNode, FC, useContext } from "react";
import { UserData, UserDocument } from "../features/user/_types/User";
import useAuthProvider from "../features/auth/_hooks/useAuthProvider";

type AuthProviderProps = {
    children: ReactNode;
};

export type AuthContextType = {
    authenticating: boolean;
    isAuthenticated: boolean;
    user: UserDocument | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    signup: (userData: UserData) => Promise<void>; // Use UserData instead of UserDocument
};

// Initial State
const initialAuthState: AuthContextType = {
    authenticating: false,
    isAuthenticated: false,
    user: null,
    login: async () => {},
    logout: async () => {},
    signup: async () => {},
};
// Context
export const AuthContext = createContext<AuthContextType>(initialAuthState);

// AuthProvider Component
const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const authState = useAuthProvider(initialAuthState);

    return (
        <AuthContext.Provider value={authState}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
