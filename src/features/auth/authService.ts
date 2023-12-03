import { Account } from "appwrite";
import { account } from "../../services/appwrite";

import User, { UserType } from "../user/_types/User";
import { LoginType } from "./_types/Login";
import { SignUpType } from "./_types/SignUp";
import { createUser, getUser } from "../../services/users.service";

export async function loginUser({ email, password }: LoginType): Promise<any> {
    console.log("in login func");
    try {
        const session = await account.createEmailSession(email, password);

        localStorage.setItem("session", JSON.stringify(session));

        return User(session);
    } catch (error) {
        throw error;
    }
}

export async function logoutUser() {
    try {
        await account.deleteSession("current");
        localStorage.removeItem("session");
        return true;
    } catch (error) {
        throw error;
    }
}

export async function getCurrentSession() {
    try {
        const session = await account.getSession("current");
        return session;
    } catch (error) {
        throw error;
    }
}

export async function signup(userData: SignUpType) {
    try {
        const { userCreationResponse, documentCreationResponse } =
            await createUser(userData);
        console.log(userCreationResponse);
        console.log(documentCreationResponse);

        await loginUser({ email: userData.email, password: userData.password });
    } catch (error) {
        console.error("Signup Error:", error);
    }
}

// Check current session and get user data
export const checkCurrentUser = async () => {
    try {
        const session = await account.getSession("current");
        const userDocument = await getUser(session.userId);

        return {
            session: session,
            user: userDocument,
        };
    } catch (error) {
        console.error("Error checking current user:", error);
    }
};
