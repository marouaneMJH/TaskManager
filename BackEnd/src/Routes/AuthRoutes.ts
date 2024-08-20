import express, { Request, Response } from "express";
import { z } from "zod";
import { signUpSchema, signInSchema } from "../Models/Schema.js";
import { UserModel } from "../Models/User.js";
const router = express.Router();

// For sign-up
router.post("/auth/register", async (req: Request, res: Response) => {
    try {
        // Validate the request data
        const validatedData = signUpSchema.parse(req.body);

        // Placeholder response
        const user = new UserModel({
            userID: 1,
            username: validatedData.username,
            email: validatedData.email,
            passwordHash: validatedData.password,
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
        });

        // Check if the user exist for induplicate the data
        const userIsExist = await user.isExist();
        if (userIsExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Save the user in the database
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        if (error instanceof z.ZodError) {
            // If there's a validation error, send the error messages
            res.status(400).json({ errors: error.errors });
        } else {
            // For any other errors
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
});

router.post("/auth/sign-in", async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        const validatedData = signInSchema.parse(req.body);
         res.status(200).send("/dash-board");
    } catch (error) {
        console.log("sign-inInvalid request:", error);
        res.status(400).json({ message: "Invalid request" });
    }
});
export default router;
