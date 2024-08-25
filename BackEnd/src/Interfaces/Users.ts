export default interface User {
    userID: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash?: string;
    createdAt?: Date;
}
