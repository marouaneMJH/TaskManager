import express, { Request, Response } from "express";
import { getListInfos } from "./../Controllers/ListControllers.js"; 

const router = express.Router();

router.get("/lists", async (req: Request, res: Response) => {
    try {
        const result = await (req.body.userId);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching list information:", error);
        res.status(500).json([]);
    }
});

export default router;
