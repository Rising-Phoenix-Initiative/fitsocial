import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { UserData, UserDocument } from "../features/user/_types/User";
import { auth, db } from "./firebase";

// Create a new user both in the authentication system and in the user collection
export const createUser = async (
    userData: UserData
): Promise<UserCredential> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            userData.email,
            userData.password
        );
        const userRef = doc(db, "users", userCredential.user.uid);

        const now = Timestamp.fromDate(new Date());

        const userCollectionData: UserDocument = {
            uid: userCredential.user.uid,
            name: userData.name,
            email: userData.email,
            username: userData.username,
            gender: userData.gender || "",
            photoURL: "", // Default or user-provided URL
            bio: "",
            createdAt: now.toDate(),
            updatedAt: now.toDate(),
            followingCount: 0,
            followersCount: 0,
            interests: [], // Empty array or user-provided interests
            level: "", // Default or user-provided level
            goals: [], // Empty array or user-provided goals
            birthdate: userData.birthdate || new Date(), // Default or user-provided birthdate
            postsCount: 0,
            recentLikedPosts: [],
        };

        await setDoc(userRef, userCollectionData);

        return userCredential;
    } catch (error) {
        throw error;
    }
};

// Get a user by document ID
export const getUser = async (
    userId: string
): Promise<UserDocument | undefined> => {
    try {
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            return userDoc.data() as UserDocument;
        } else {
            console.error("User not found");
        }
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw error;
    }
};
