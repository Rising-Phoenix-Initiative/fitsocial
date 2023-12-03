import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
    loginUser,
    logoutUser,
    getCurrentSession,
    checkCurrentUser,
} from "../authService";
import { UserType } from "../../user/_types/User";
import { createUser } from "../../../services/users.service";

type AuthProviderProps = {
    initialAuthState: {
        isAuthenticated: boolean;
        user: UserType | null;
    };
};

const useAuthProvider = (initialAuthState: any) => {
    console.log("initialAuthState 2", initialAuthState);
    const [user, setUser] = useState<any>({});
    const [isAuthenticated, setIsAuthenticated] = useState(
        initialAuthState.isAuthenticated
    );
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const checkSession = useCallback(async () => {
        setLoading(true);
        try {
            const data: any = await checkCurrentUser();
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
            console.error("Check Session Error:", error);
            setLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const session: any = await loginUser({ email, password });
            localStorage.setItem("session", JSON.stringify(session));
            checkSession();
            navigate("/");
        } catch (error) {
            console.error("Login Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const signup = async (userData: UserType) => {
        try {
            const { userCreationResponse, documentCreationResponse } =
                await createUser(userData);
            if (userCreationResponse && documentCreationResponse) {
                await loginUser({
                    email: userData.email,
                    password: userData.password,
                });
            }
        } catch (error) {
            console.error("Signup Error:", error);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await logoutUser();
            setIsAuthenticated(false);
            setUser(null);
            localStorage.removeItem("session");
            navigate("/");
        } catch (error) {
            console.error("Logout Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkSession();
    }, [checkSession]);

    return {
        user,
        isAuthenticated,
        authenticating: loading,
        login,
        logout,
        signup,
        checkSession,
    };
};

export default useAuthProvider;
