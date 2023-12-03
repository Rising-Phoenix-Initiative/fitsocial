import { Models } from 'appwrite';

export type UserType = {
    email: string,
}

const User = (userData: Models.Session|null) => {
    console.log('in User wrapper func')
    if (!userData){
        console.log('no userData')
        throw new Error('User session not provided')
    }

    console.log({userData})

    return {
        email: userData?.providerUid,
    }
}

export default User