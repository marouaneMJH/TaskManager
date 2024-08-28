import express, { Request, Response } from "express";
import {
    getBoards,
    addBoard,
    editBoard,
    removeBoard,
} from "../Controllers/BoardController.js";

const router = express.Router();

// Get  boards
router.get("/board", async (req: Request, res: Response) => {
    const userID = req.body.userID;
    try {
        const result = await getBoards(userID);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send({ message: "Board fetching error" });
    }
});

// Add board
router.post("/board", async (req: Request, res: Response) => {
    const userID = req.body.userID;
    const boardName = req.body.boardName;

    if (!boardName)
        return res.status(400).send({ message: "Board name is required" });
    try {
        await addBoard(userID, boardName);
        return res.status(201).send({ message: "Board added successfully" });
    } catch (err) {
        return res.status(500).send({ message: "Error adding board" });
    }
});


// Edit board
router.put("/board/:boardID", async (req: Request, res: Response) => {
    const { boardID } = req.params;
    const { boardName, userID } = req.body;

    if (!boardName)
        return res.status(400).send({ message: "Board name is required" });

    try {
        await editBoard(boardID, boardName, userID);
        return res.status(200).send({ message: "Board updated successfully" });
    } catch (err) {
        return res.status(500).send({ message: "Error updating board" });
    }
});

// Delete board
router.delete("/board/:boardID", async (req: Request, res: Response) => {
    const { boardID } = req.params;
    const { userID } = req.body;

    try {
        await removeBoard(boardID, userID);
        return res.status(200).send({ message: "Board removed successfully" });
    } catch (err) {
        return res.status(500).send({ message: "Error removing board" });
    }
});

export default router;
