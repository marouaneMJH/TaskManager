import express, { Request, Response } from "express";
import {
    getCardInfoById,
    getCardsByListId,
    addNewCard,
    editCard,
    removeCard,
} from "../Controllers/CardControllers.js";
import { info } from "console";
import Card from "../Interfaces/Card.js";
import { ColumnTypeUndefinedError } from "typeorm";
import { nan, union } from "zod";
import { isModuleNamespaceObject } from "util/types";

const router = express.Router();

// Get information of single card
router.get("/task/:cardID", async (req: Request, res: Response) => {
    const { cardID } = req.params;
    const userID = req.body.userID;
    if (!cardID)
        return res.status(400).send({ message: "card ID is required" });
    res;
    try {
        const cardInfo = await getCardInfoById(cardID, userID);
        if (cardInfo.length === 0) {
            return res.status(400).json({ message: "Card not found" });
        }
        res.status(200).json(cardInfo[0]);
    } catch (error) {
        console.error("Error fetching card information:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get container card by list ID
router.get("/cards/:id", async (req: Request, res: Response) => {
    const listID = parseInt(req.params.id);

    if(isNaN(listID))
        res.status(400).send({message: "List ID is required"})
    try {
        const result = await getCardsByListId(req.body.userID, listID);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Failed to fetch cards" });
    }
});

router.post("/cards/:listID", async (req: Request, res: Response) => {
    const listID = parseInt(req.params.listID);
        //todo frontEnd change
        if (!req.body.cardTitle || isNaN(listID)) {
            return res.status(400).json({ message: "Missing title and list ID" });
        }
    try {

        await addNewCard(req.body.userID, listID, req.body.cardTitle);
        return res.status(200).send({ message: "Task added successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to add task" });
    }
});

router.put("/cards/:cardID", async (req: Request, res: Response) => {
    const { cardID } = req.params;
    const userID = req.body.userID;
    let card: Card = {
        cardID: parseInt(cardID),
        cardTitle: req.body.cardTitle,
        cardDescription: req.body.cardDescription,
    };

    if (isNaN(card.cardID))
        res.status(400).send({ message: "Card ID is required" });
    try {
        //todo more card field
        await editCard(userID, card);
        res.status(200).send("Card updated successfully");
    } catch (err) {
        console.error(err);
        res.status(5000).send({ message: "Error editing card" });
    }
});

router.delete("/cards/:cardID", async (req: Request, res: Response) => {
    const { cardID } = req.params;
    const userID = req.body.userID;
    if (!cardID)
        return res.status(400).send({ message: "Card ID is required" });
    try {
        await removeCard(cardID, userID);
        return res.status(200).send({ message: "Card removed successfully" });
    } catch (err) {
        return res.status(500).send({ message: "Error removing card" });
    }
});
export default router;
