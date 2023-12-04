import { auth } from "../../services/firebase";
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    UserCredential,
    User,
} from "firebase/auth";
import "firebase/auth";
import { getUser } from "../../services/users.service";
import { UserDocument } from "../user/_types/User";

// Login a user
export const loginUser = async (
    email: string,
    password: string
): Promise<User> => {
    try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

// Check current session and get user data
export const checkCurrentUser = async (): Promise<{
    user: UserDocument | null;
}> => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            console.log("checkCurrentUser", user);
            if (user) {
                try {
                    const userDocument = (await getUser(
                        user.uid
                    )) as UserDocument;
                    console.log("userDocument: ", userDocument);
                    resolve({ user: userDocument });
                } catch (error) {
                    reject(error);
                }
            } else {
                resolve({ user: null });
            }
        });
    });
};

// Logout the current user
export const logoutUser = async (): Promise<boolean> => {
    try {
        await signOut(auth);
        return true;
    } catch (error) {
        throw error;
    }
};
