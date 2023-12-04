import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser, checkCurrentUser } from "../authService";
import { UserData, UserType } from "../../user/_types/User";
import { createUser } from "../../../services/users.service";
import { AuthContextType } from "../../../context/auth.context";

const useAuthProvider = (initialAuthState: AuthContextType) => {
    const [user, setUser] = useState<UserType | null>(initialAuthState.user);
    const [isAuthenticated, setIsAuthenticated] = useState(
        initialAuthState.isAuthenticated
    );
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const checkSession = useCallback(async () => {
        setLoading(true);
        try {
            const sessionData = await checkCurrentUser();
            if (sessionData) {
                setIsAuthenticated(true);
                setUser(sessionData.user);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            console.error("Check Session Error:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        checkSession();
    }, [checkSession]);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            await loginUser(email, password);
            await checkSession();
        } catch (error) {
            console.error("Login Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const signup = async (userData: UserData) => {
        setLoading(true);
        try {
            await createUser(userData);
            await login(userData.email, userData.password);
        } catch (error) {
            console.error("Signup Error:", error);
        } finally {
            setLoading(false);
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
