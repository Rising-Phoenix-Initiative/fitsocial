import React, { createContext, ReactNode, FC, useContext } from "react";
import { UserData, UserDocument } from "../features/user/_types/User";
import useAuthProvider from "../features/auth/_hooks/useAuthProvider";
import { LoginType } from "../features/auth/_types/Login";

type AuthProviderProps = {
    children: ReactNode;
};

export type AuthContextType = {
    authenticating: boolean;
    isAuthenticated: boolean;
    user: UserDocument | null;
    handleLogin: ({email, password}: LoginType) => Promise<void>;
    handleLogout: () => Promise<void>;
    handleSignup: (userData: UserData) => Promise<void>; // Use UserData instead of UserDocument
};

// Initial State
const initialAuthState: AuthContextType = {
    authenticating: false,
    isAuthenticated: false,
    user: null,
    handleLogin: async () => {},
    handleLogout: async () => {},
    handleSignup: async () => {},
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
