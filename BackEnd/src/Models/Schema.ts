import { z } from "zod";

export const signUpSchema = z
    .object({
        username: z
            .string()
            .min(3, "Username must be at least 3 characters long")
            .regex(
                /^[a-zA-Z][a-zA-Z0-9_]*$/,
                "Username can only letters, underscores, numbers, and ensure the name does not start with a number"
            ),
        firstName: z
            .string()
            .min(2, "Full name must be at least 2 characters long")
            .max(50, "Full name must not exceed 50 characters")
            .regex(
                /^[a-zA-Z\s'-]+$/,
                "Full name can only contain letters, spaces, hyphens, and apostrophes"
            ),
        lastName: z
            .string()
            .min(2, "Full name must be at least 2 characters long")
            .max(50, "Full name must not exceed 50 characters")
            .regex(
                /^[a-zA-Z\s'-]+$/,
                "Full name can only contain letters, spaces, hyphens, and apostrophes"
            ),
        email: z.string().email("Invalid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
});

export const textInputSchema = z
    .string()
    .regex(/^[a-zA-Z0-9\s]+$/, "Invalid characters in input");

export const TitleInputSchema = z
    .string()
    .min(1, "Input cannot be empty")
    .max(255, "Input is too long")
    .regex(/^[a-zA-Z0-9\s]+$/, "Invalid characters in input");
