jest.mock('./authService')

import {login} from './authService'

function setUpSuccessMockLogin(){
    const mockLogin = login as jest.MockedFunction<typeof login>
    mockLogin.mockResolvedValue({email: 'john@example.com'})
    
    return mockLogin
}

function setUpFailureMockLogin(){
    const mockLogin = login as jest.MockedFunction<typeof login>
    mockLogin.mockRejectedValue(new Error('Invalid credentials'))
    
    return mockLogin
}

describe('AuthService', () => {
    describe('login', () => {
        it('should return a User if given valid credentials', async () => {
            const mockLogin = setUpSuccessMockLogin()
            const user = await login({email: 'validEmail', password: 'validPassword'})
            
            expect(mockLogin).toHaveBeenCalledWith({email: 'validEmail', password: 'validPassword'})
            expect(user).toHaveProperty('email')
        })

        it('should throw an error if given invalid credentials', async () => {
            const mockLogin = setUpFailureMockLogin()

            try {
                await login({email: 'validEmail', password: 'badPassword'})
                expect(true).toBe(false)
            } catch (error){
                expect(error.message).toMatch('Invalid credentials')
                expect(error).toBeInstanceOf(Error)
            }
        })
    })
})