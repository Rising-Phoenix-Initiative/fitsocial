import { useEffect, useState } from "react";
import { checkSession, getCurrentSession } from "../authService";
import User, { UserType } from "../../user/_types/User";
import { Models } from "appwrite";
import { useNavigate } from "react-router-dom";
import { AuthContextType } from "../../../context/auth.context";

const useAuthProvider = (initialAuthState: AuthContextType) => {
    const [currentSession, setCurrentSession] = useState<Models.Session|null>(null)
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<Models.Session|null>(null);
    const navigate = useNavigate();

        // const checkSession = useCallback(async () => {
    //     setLoading(true);
    //     try {
    //         const data = await checkCurrentUser();
    //         if (data.session && data.user) {
    //             setTimeout(() => {
    //                 setLoading(false);
    //                 setIsAuthenticated(true);
    //                 setUser(data.user);
    //             }, 2000);
    //         } else {
    //             setLoading(false);
    //         }
    //     } catch (error) {
    //         console.error('Check Session Error:', error);
    //         setLoading(false);
    //     }
    // }, []);

    // const signup = async (userData) => {
    //     try {
    //         const { userCreationResponse, documentCreationResponse } = await createUser(userData);
    //         if (!!userCreationResponse && !!documentCreationResponse) {
    //             await login(userData.email, userData.password);
    //         }
    //         else {
    //             console.log("future error handling here")
    //         }
    //     } catch (error) {
    //         console.error('Signup Error:', error);
    //     }
    // };


    // const login = async (email, password) => {
    //     setLoading(true);
    //     try {
    //         const session = await loginUser(email, password);
    //         localStorage.setItem('session', JSON.stringify(session));
    //         checkSession();
    //         navigate('/');
    //     } catch (error) {
    //         console.error('Login Error:', error);
    //     }
    // };

    // const logout = async () => {
    //     setLoading(true);
    //     try {
    //         await logoutUser();
    //         setIsAuthenticated(false);
    //         setUser(null);
    //         localStorage.removeItem('session');
    //         setLoading(false);
    //         navigate('/');
    //     } catch (error) {
    //         console.error('Logout Error:', error);
    //     }
    // };

    useEffect(() => {
        setLoading(true);
        const localSession = localStorage.getItem('session');

        const handleSessionService = async () => {
            const appwriteSession = await getCurrentSession()
            
            setCurrentSession(appwriteSession);
            setUser(appwriteSession)
            setIsAuthenticated(true);
        }
        
        if (localSession) {
            setTimeout(async () => {
                setLoading(false);
                setIsAuthenticated(true);
                let activeSession: Models.Session = await JSON.parse(localSession)
                
                if (!!activeSession){
                    setCurrentSession(activeSession);
                    setUser(activeSession)
                }
            }, 2000);
        } else if (!localStorage) {
             handleSessionService()
            } else {

            setLoading(false);
        }
    }, []);


    // Check the session on app start
    useEffect(() => {
        checkSession();
    }, [checkSession]);

    return { ...initialAuthState, currentSession, isAuthenticated, authenticating: loading, user, }
}

export default useAuthProvider