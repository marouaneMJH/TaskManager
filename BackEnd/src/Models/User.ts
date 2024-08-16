import IUser from "../Interfaces/Users.js";
// User implementation
export class User implements IUser {
    userID: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    createdAt: Date;

    constructor(
        userID: number,
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        passwordHash: string
    ) {
        this.userID = userID;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.passwordHash = passwordHash;
        this.createdAt = new Date();
    }

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    toJSON(): object {
        return {
            userID: this.userID,
            username: this.username,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            createdAt: this.createdAt,
        };
    }

    static async create(
        userData: Omit<User, "userID" | "createdAt">
    ): Promise<User> {
        // Here you would typically:
        // 1. Validate the input
        // 2. Hash the password
        // 3. Insert into database
        // 4. Return the created user

        const newUserID = Math.floor(Math.random() * 1000000); // Generate a random ID
        const newUser = new User(
            newUserID,
            userData.username,
            userData.firstName,
            userData.lastName,
            userData.email,
            userData.passwordHash
        );

        await User.save(newUser);

        return newUser;
    }

    static async findById(userID: number): Promise<User | null> {
        // Implement database lookup logic here
        // This is a placeholder implementation
        console.log(`Looking up user with ID: ${userID}`);
        return null;
    }

    static async update(user: User): Promise<User> {
        // Implement database update logic here
        // This is a placeholder implementation
        console.log("Updating user:", user);
        return user;
    }

    static async delete(userID: number): Promise<boolean> {
        // Implement database delete logic here
        // This is a placeholder implementation
        console.log(`Deleting user with ID: ${userID}`);
        return true;
    }

    private static async save(user: User): Promise<void> {
        // This method would typically save the user to a database
        console.log("Saving user to database:", user);
        // Implement actual database save logic here
    }
}
