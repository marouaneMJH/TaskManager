import bcrypt from "bcrypt"
// import env from "dotenv";
export async function passHash(password: string): Promise<string> {
    try {
        const hashPassword = await bcrypt.hash(
            password,
            Number(process.env.BCRYPT_SALT_ROUND)
        );
        return hashPassword;
    } catch (err) {
        console.error("Error in hashing password:");
        return err;
    }
}
