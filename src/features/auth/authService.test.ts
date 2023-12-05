jest.mock('./authService')

import { User } from 'firebase/auth';
import {loginUser} from './authService'

function setUpSuccessMockLogin(){
    const mockLogin = loginUser as jest.MockedFunction<typeof loginUser>
    const mockUser: User = {
        uid: '123456',
        email: 'john@example.com',
        displayName: 'John Doe',
        photoURL: 'https://example.com/photo.jpg',
        emailVerified: true,
        phoneNumber: '+1234567890',
        isAnonymous: false,
        providerData: [
          {
            providerId: 'password',
            uid: '123456',
            displayName: 'John Doe',
            email: 'john@example.com',
            phoneNumber: '+1234567890',
            photoURL: 'https://example.com/photo.jpg',
          },
        ],
        metadata: {}, 
        refreshToken: '',
        tenantId: '', 
        delete: async (): Promise<void> => {},
        getIdToken: async (): Promise<string> => '',
        // Typing this as any instead of mocking an IdTokenResult
        getIdTokenResult: async (): Promise<any> => {},
        reload: async (): Promise<void> => {},
        toJSON: async (): Promise<void> => {},
        providerId: ''
      };
    
    mockLogin.mockResolvedValue(mockUser)
    
    return mockLogin
}

function setUpFailureMockLogin(){
    const mockLogin = loginUser as jest.MockedFunction<typeof loginUser>
    mockLogin.mockRejectedValue(new Error('Invalid credentials'))
    
    return mockLogin
}

describe('AuthService', () => {
    describe('loginUser', () => {
        it('should return a User if given valid credentials', async () => {
            const mockLogin = setUpSuccessMockLogin()
            const user = await loginUser({email: 'validEmail', password: 'validPassword'})
            
            expect(mockLogin).toHaveBeenCalledWith({email: 'validEmail', password: 'validPassword'})
            expect(user).toHaveProperty('email')
        })

        it('should throw an error if given invalid credentials', async () => {
            const mockLogin = setUpFailureMockLogin()

            try {
                await loginUser({email: 'validEmail', password: 'badPassword'})
                expect(true).toBe(false)
            } catch (error){
                expect(error.message).toMatch('Invalid credentials')
                expect(error).toBeInstanceOf(Error)
            }
        })
    })
})