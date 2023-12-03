import { Models } from 'appwrite';

export type UserType = Models.Session & {
    email: string,
}

export type UserWrapperInput = Models.Session|null 

const User = async (userData: UserWrapperInput) => {
    console.log('in User wrapper func')
    if (!userData){
        console.log('no userData')
        throw new Error('User session not provided')
    }

    console.log({userData})

    return {
        ...userData, 
        email: userData?.providerUid,
    }
}

export default User