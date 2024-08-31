import express, { Request, Response } from "express";
import {
    getListInfos,
    addList,
    removeList,
    editList,
} from "./../Controllers/ListControllers.js";

const router = express.Router();

router.get("/list/:boardID", async (req: Request, res: Response) => {
    const userID = req.body.userID;
    const { boardID } = req.params;
    try {
        const result = await getListInfos(userID, boardID);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching list information:", error);
        res.status(500).json([]);
    }
});

// Add list
router.post("/list", async (req: Request, res: Response) => {
    const userID = req.body.userID;
    const listName = req.body.listName;
    const boardID = req.body.boardID;

    if (!listName || !boardID)
        return res.status(400).send({ message: "List name is required" });
    try {
        await addList(listName, boardID, userID);
        return res.status(201).send({ message: "list added successfully" });
    } catch (err) {
        return res.status(500).send({ message: "Error adding list" });
    }
});

// Edit list
router.put("/list/:listID", async (req: Request, res: Response) => {
    const { listID } = req.params;
    const { listName, userID } = req.body;

    if (!listName)
        return res.status(400).send({ message: "List name is required" });

    try {
        await editList(listID, listName, userID);
        return res.status(200).send({ message: "List updated successfully" });
    } catch (err) {
        return res.status(500).send({ message: "Error updating List" });
    }
});

// Delete list
router.delete("/list/:listID", async (req: Request, res: Response) => {
    const { listID } = req.params;
    const userID = req.body.userID;
    if (!listID) return res.status(400).send({ message: "List ID is required" });
    try {
        await removeList(listID, userID);
        return res.status(200).send({ message: "list removed successfully" });
    } catch (err) {
        return res.status(500).send({ message: "Error removing list" });
    }
});

export default router;
