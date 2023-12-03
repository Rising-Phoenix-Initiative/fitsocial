import { useEffect, useState } from "react";
import { checkSession, getCurrentSession } from "../authService";
import User, { UserType } from "../../user/_types/User";
import { Models } from "appwrite";

const useAuthProvider = () => {
    const [currentSession, setCurrentSession] = useState<Models.Session|null>(null)
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<Models.Session|null>(null);

    useEffect(() => {
        setLoading(true);
        const session = localStorage.getItem('session');
        if (session) {
            setTimeout(async () => {
                setLoading(false);
                setIsAuthenticated(true);
                let activeSession: Models.Session = await JSON.parse(session)
                
                if (!!activeSession){
                    setCurrentSession(activeSession);
                    setUser(activeSession)
                }
            }, 2000);
        } else {
            setLoading(false);
        }
    }, []);


    // Check the session on app start
    useEffect(() => {
        checkSession();
    }, []);

    return { currentSession, isAuthenticated, authenticating: loading, user}
}

export default useAuthProvider