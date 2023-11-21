import { Models } from 'appwrite';

export type UserType = {
    email: string,
}

const User = (userData: Models.Session|null) => {
    if (!userData){
        throw new Error('User session not provided')
    }

    console.log(userData)

    return {
        email: ''
    }
}

export default User