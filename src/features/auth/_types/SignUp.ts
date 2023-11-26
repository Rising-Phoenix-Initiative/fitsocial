export type SignUpType = {
    email: string,
    password: string,
    confirmPassword: string,
    name: string, // TODO: I feel like this should be saved as first last for better user customization later
    username: string
    birthdate: Date,
    gender: string, // TODO: This should be modified to an enum imo
}