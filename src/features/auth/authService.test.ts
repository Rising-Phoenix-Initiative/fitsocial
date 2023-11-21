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
            const user = await login('validEmail', 'validPassword')
            
            expect(mockLogin).toHaveBeenCalledWith('validEmail', 'validPassword')
            expect(user).toHaveProperty('email')
        })

        it('should throw an error if given invalid credentials', async () => {
            const mockLogin = setUpFailureMockLogin()

            try {
                await login('validEmail', 'badPassword')
                expect(true).toBe(false)
            } catch (error){
                expect(error.message).toMatch('Invalid credentials')
                expect(error).toBeInstanceOf(Error)
            }
        })
    })
})