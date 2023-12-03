import { account, databases } from './appwrite';
import { FIT_SOCIAL_DATABASE_ID, USERS_COLLECTION_ID } from './config'
import { Permission, Role } from 'appwrite';

// Create a new user both in the account and in the user collection
export const createUser = async (userData) => {
    try {
        const userCreationResponse = await account.create('unique()', userData.email, userData.password, userData.name);
        const userCollectionData = {
            name: userData.name,
            username: userData.username,
            birthdate: userData.birthdate,
            gender: userData.gender,
        };

        const documentCreationResponse = await databases.createDocument(
            FIT_SOCIAL_DATABASE_ID,
            USERS_COLLECTION_ID,
            userCreationResponse.$id,
            userCollectionData,
            [Permission.read(Role.any())],
            [Permission.write(Role.user(userCreationResponse.$id))],
        );

        return { userCreationResponse, documentCreationResponse };
    } catch (error) {
        throw error;
    }
};
