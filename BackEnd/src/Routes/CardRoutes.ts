import express, { Request, Response } from "express";
import {
    getCardInfoById,
    getCardsByListId,
} from "../Controllers/CardControllers.js";

const router = express.Router();

router.get("/task/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const cardInfo = await getCardInfoById(id);

        if (cardInfo.length === 0) {
            return res.status(404).json({ message: "Card not found" });
        }

        res.status(200).json(cardInfo[0]);
    } catch (error) {
        console.error("Error fetching card information:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/cards/:id", async (req: Request, res: Response) => {
    const listID = parseInt(req.params.id);

    try {
        const result = await getCardsByListId(listID);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching cards:", error);
        res.status(500).send("Failed to fetch cards");
    }
});

export default router;
