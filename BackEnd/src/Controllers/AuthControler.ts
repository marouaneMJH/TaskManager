import User from "../Interfaces/Users.js";
export function saveUser(user: User) {
    // userID: number;
    // username: string;
    // firstName: string;
    // lastName: string;
    // email: string;
    // passwordHash: string;
    // createdAt: Date;
    const query = `INSERT INTO "users" ( "userName", "firstName", "lastName", "email", "passwordHash", "createdAt") VALUES ($1,$2,$3,$4,$5,CURRENT_TIMESTAMP)`;
}
