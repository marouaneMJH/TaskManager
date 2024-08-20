import User from "../Interfaces/Users.js";
import db from "../Config/PgConfig.js";
import { passHash } from "./HashPassword.js";


/**
 * 
 * @param data with type User
 * @returns Promise<>
 * @description function to create user in DB without verifications the data
 */
export async function createUserDB(data: Omit<User, 'userID' | 'createdAt'>): Promise<User> {
    try {
        const query = `INSERT INTO "users" ( "userName", "firstName", "lastName", "email", "passwordHash", "createdAt") VALUES ($1,$2,$3,$4,$5,CURRENT_TIMESTAMP) RETURNING *`;
        const passwordHash = passHash(data.passwordHash)
        const response = await db.query(query, [
            data.username,
            data.firstName,
            data.lastName,
            data.email,
            data.passwordHash,
        ]);
        return response.rows[0] as User;
    } catch (err) {
        return err;
    }
}
