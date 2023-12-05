import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser, checkCurrentUser } from "../authService";
import { UserData, UserDocument, UserType } from "../../user/_types/User";
import { createUser } from "../../../services/users.service";
import { AuthContextType } from "../../../context/auth.context";
import { LoginType } from "../_types/Login";

const useAuthProvider = (initialAuthState: AuthContextType) => {
    const [user, setUser] = useState<UserDocument | null>(
        initialAuthState.user
    );
    const [isAuthenticated, setIsAuthenticated] = useState(
        initialAuthState.isAuthenticated
    );
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const checkSession = useCallback(async () => {
        setLoading(true);
        try {
            const sessionData = await checkCurrentUser();
            console.log("sessionData", sessionData);
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

    const handleSignup = async (userData: UserData) => {
        setLoading(true);
        try {
            await createUser(userData);
            await handleLogin({email: userData.email, password: userData.password});
        } catch (error) {
            console.error("Signup Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async ({email, password }: LoginType) => {
        setLoading(true);
        try {
            await loginUser({email, password});
            await checkSession();
        } catch (error) {
            console.error("Login Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
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
        handleLogin,
        handleLogout,
        handleSignup,
        checkSession,
    };
};

export default useAuthProvider;
