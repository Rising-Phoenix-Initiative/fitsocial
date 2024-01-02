import { User } from "firebase/auth";

const mockUser: User =  {
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
  }

  export default mockUser