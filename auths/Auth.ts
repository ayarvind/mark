export interface UserProps {
    username: string;
    password: string;
    email: string;
    dob: string;
    gender: string;
    profilePic: string;
    fullname: string;

}

abstract class Auth {
    abstract register(user: UserProps): Promise<void>;
    abstract verifyEmail(email: string): Promise<number>;
    // ... other abstract methods
}


export default Auth;