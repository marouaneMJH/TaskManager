import express, { Request, Response } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
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
// For sign-in and generate the token
router.post("/auth/sign-in", async (req: Request, res: Response) => {
    try {
        const validatedData = signInSchema.parse(req.body);
        const user = await UserModel.authenticate(
            req.body.email,
            req.body.password
        );
        if (user == null) {
            res.status(401).json({ message: "Invalid email or password" });
        }

        res.cookie("jwt", user, {
            httpOnly: true,
            maxAge: 20 * 60 * 60 * 1000, //20 day
        });
        res.status(200).send({ message: "done" });
    } catch (error) {
        console.log("sign-inInvalid request:", error);
        res.status(400).json({ message: "Invalid request" });
    }
});

router.get("/user", async (req: Request, res: Response) => {
    try {
        const cookie = req.cookies["jwt"];

        if (!cookie) {
            return res.status(401).send("Unauthorized: No token provided");
        }

        const claim = jwt.verify(cookie, process.env.JWT_SECRET_KEY as string);

        if (claim) {
            return res.send(claim);
        } else {
            return res.status(401).send("Unauthorized: Invalid token");
        }
    } catch (err) {
        return res.status(400).send("Something went wrong: " + err.message);
    }
});

// for logout and destroy the token 
router.post("/auth/log-out", async (req: Request, res: Response) => {
    res.cookie("jwt", { maxAge: 0 });
    res.status(200).send({ message: "cookie removed  successfully" });
});
export default router;
