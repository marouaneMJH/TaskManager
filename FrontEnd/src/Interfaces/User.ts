export default interface User {
    userID?: number;
    username?: string;
    firstName?:string;
    lastName?:string;
    email: string;
    password: string;
    confirmPassword?:string;
    createdAt?: Date;
}
