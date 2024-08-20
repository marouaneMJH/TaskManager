import db from "../Config/PgConfig.js";
import User from "../Interfaces/Users.js";
import { passHash } from "../Controllers/HashPassword.js";
import { createUserDB } from "../Controllers/AuthControler.js";

export class UserModel {
    userID: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    createdAt: Date;

    constructor(user: User) {
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.passwordHash = user.passwordHash;
        this.createdAt = user.createdAt;
    }

    // Create a new user in the database
    async save(): Promise<User> {
        try {
            const query = `INSERT INTO "users" ("username", "firstName", "lastName", "email", "passwordHash") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            const hashedPassword = await passHash(this.passwordHash);
            const response = await db.query(query, [
                this.username,
                this.firstName,
                this.lastName,
                this.email,
                hashedPassword,
            ]);
            return response.rows[0] as User;
        } catch (err) {
            throw new Error(`Error creating user: ${err.message}`);
            return err;
        }
    }
    //check of the user is exit in the database
    async isExist(): Promise<boolean> {
        try {
            const query = `SELECT * FROM "users" WHERE "email" = $1`;
            const response = await db.query(query, [this.email]);
            return response.rows.length > 0;
        } catch (err) {
            throw new Error(`Error checking user existence`);
        }
    }
    // Static method to create a new user instance and save it to the database
    static async createUser(user: User): Promise<User> {
        const userModel = new UserModel(user);
        return await userModel.save();
    }

    // Retrieve a user by ID from the database
    static async getUserById(userID: number): Promise<User> {
        const query = `SELECT * FROM users WHERE "userID" = $1;`;
        const values = [userID];

        try {
            const result = await db.query(query, values);
            if (result.rows.length === 0) {
                return null;
            }
            return result.rows[0] as User;
        } catch (err) {
            console.error("Error retrieving user by ID:", err);
            throw err;
        }
    }

    // Update user information
    async updateUser(
        data: Partial<Omit<User, "userID" | "createdAt">>
    ): Promise<void> {
        const fields: string[] = [];
        const values: any[] = [];
        let i = 1;

        if (data.username) {
            fields.push(`username = $${i++}`);
            values.push(data.username);
        }
        if (data.firstName) {
            fields.push(`firstName = $${i++}`);
            values.push(data.firstName);
        }
        if (data.lastName) {
            fields.push(`lastName = $${i++}`);
            values.push(data.lastName);
        }
        if (data.email) {
            fields.push(`email = $${i++}`);
            values.push(data.email);
        }
        if (data.passwordHash) {
            fields.push(`passwordHash = $${i++}`);
            values.push(data.passwordHash);
        }

        if (fields.length === 0) return;

        const query = `
      UPDATE users
      SET ${fields.join(", ")}
      WHERE userID = $${i}
    `;
        values.push(this.userID);

        try {
            await db.query(query, values);
        } catch (err) {
            console.error("Error updating user:", err);
            throw err;
        }
    }

    // Delete a user from the database
    async deleteUser(): Promise<void> {
        const query = `DELETE FROM users WHERE userID = $1;`;
        const values = [this.userID];

        try {
            await db.query(query, values);
        } catch (err) {
            console.error("Error deleting user:", err);
            throw err;
        }
    }

    // Authenticate a user by email and password
    static async authenticate(
        email: string,
        passwordHash: string
    ): Promise<User | null> {
        const query = `SELECT * FROM users WHERE email = $1;`;
        const values = [email];

        try {
            const result = await db.query(query, values);
            if (result.rows.length === 0) {
                return null;
            }
            const user = result.rows[0] as User;

            if (user.passwordHash === passwordHash) {
                // Use actual comparison in production
                return user;
            }

            return null;
        } catch (err) {
            console.error("Error authenticating user:", err);
            throw err;
        }
    }

    // Reset the user's password
    async resetPassword(newPasswordHash: string): Promise<void> {
        const query = `UPDATE users SET passwordHash = $1 WHERE userID = $2;`;
        const values = [newPasswordHash, this.userID];

        try {
            await db.query(query, values);
        } catch (err) {
            console.error("Error resetting password:", err);
            throw err;
        }
    }

    // List all users
    static async listAllUsers(): Promise<User[]> {
        const query = `SELECT * FROM users;`;

        try {
            const result = await db.query(query);
            return result.rows as User[];
        } catch (err) {
            console.error("Error listing all users:", err);
            throw err;
        }
    }
}
