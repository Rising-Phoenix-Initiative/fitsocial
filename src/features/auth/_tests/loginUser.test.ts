/**
 * @jest-environment node
 */
jest.mock('firebase/app', () => require('./_mocks/firebase'))
jest.mock('../authService')

import MockUser from './_mocks/mockuser'
import * as authService from '../authService'

describe('loginUser method', () => {
    beforeEach(() => {    
        jest.spyOn(authService, 'loginUser').mockRejectedValue(new Error('Invalid credentials'))
    })

    it('should return a User if given valid credentials', async () => {
        jest.spyOn(authService, 'loginUser').mockImplementation(() =>{
            return Promise.resolve(MockUser)
        })

        const user = await authService.loginUser({email: 'validEmail', password: 'validPassword'})
        
        expect(authService.loginUser).toHaveBeenCalledWith({email: 'validEmail', password: 'validPassword'})
        expect(user).toHaveProperty('email')
    })

    it('should throw an error if given invalid credentials', async () => {
        try {
            await authService.loginUser({email: 'validEmail', password: 'badPassword'})
            expect(true).toBe(false)
        } catch (error){
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toMatch('Invalid credentials')
        }

        expect(authService.loginUser).toHaveBeenCalledWith({email: 'validEmail', password: 'badPassword'})
    })

    afterEach(() => {
        jest.restoreAllMocks();
    });
})
