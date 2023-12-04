import { User } from "firebase/auth";

// Represents the basic information when signing up or logging in a user
export type UserType = {
    email: string;
    password: string;
};

// Represents detailed user data for creating a new user in Firestore
export type UserData = {
    name: string;
    username: string;
    birthdate: Date;
    gender: string;
    email: string;
    password: string;
};

// Represents a user document as stored in Firestore
export type UserDocument = {
    uid: string;
    name: string;
    email: string;
    username: string;
    gender?: string;
    photoURL?: string;
    bio?: string;
    createdAt: Date;
    updatedAt: Date;
    followingCount: number;
    followersCount: number;
    interests?: string[]; // Array of fitness interests (e.g., yoga, running)
    level?: string; // Fitness level or category (e.g., Beginner, Expert)
    goals?: string[]; // Fitness goals (e.g., Lose weight, Build muscle)
    birthdate?: Date; // User's birthdate for age calculation
    postsCount?: number; // Number of posts made by the user
    recentLikedPosts: string[]; // Array of post IDs that the user has liked recently, limited to 10
};

// Wrapper function to convert Firebase user object to UserDocument
export const userWrapper = (firebaseUser: User): UserDocument => {
    // Assuming firebaseUser has all necessary fields; adjust as needed
    return {
        uid: firebaseUser.uid,
        email: firebaseUser.email || "",
        name: "", // Default value; replace with actual value if available
        username: "", // Default value; replace with actual value if available
        gender: "",
        photoURL: firebaseUser.photoURL || "",
        bio: "",
        createdAt: new Date(), // Replace with actual date if available
        updatedAt: new Date(), // Replace with actual date if available
        followingCount: 0,
        followersCount: 0,
        interests: [],
        level: "",
        goals: [],
        birthdate: new Date(), // Replace with actual date if available
        postsCount: 0,
        recentLikedPosts: [],
    };
};
