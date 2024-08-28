import db from "../Config/PgConfig.js";
import { Board } from "../Interfaces/Board.js";
import { z } from "zod";
import { TitleInputSchema } from "../Models/Schema.js";

// Get board 
export async function getBoards(userID: string): Promise<[Board]> {
    try {
        const query = `
            SELECT "boardID" ,"boardName" FROM "boards" 
            WHERE "userID" = $1;
        `;
        const result = await db.query(query, [userID]);
        return result.rows;
    } catch (err) {
        return err;
    }
}

// Add board
export async function addBoard(
    userID: string,
    boardName: string
): Promise<void> {
    try {
        const query = `INSERT INTO "boards"("boardName","userID") VALUES($1,$2)`;
        const result = await db.query(query, [
            TitleInputSchema.parse(boardName),
            userID,
        ]);
        return result;
    } catch (err) {
        return err;
    }
}

// Edit board 
export async function editBoard(
    boardID: string,
    boardName: string,
    userID: string
): Promise<void> {
    try {
        const query = `
            UPDATE "boards"
            SET "boardName" = $1
            WHERE "boardID" = $2 AND "userID" = $3;
        `;
        await db.query(query, [
            TitleInputSchema.parse(boardName),
            boardID,
            userID,
        ]);
    } catch (err) {
        throw new Error("Error updating board");
    }
}

// Remove board 
export async function removeBoard(
    boardID: string,
    userID: string
): Promise<void> {
    try {
        const query = `
            DELETE FROM "boards"
            WHERE "boardID" = $1 AND "userID" = $2;
        `;
        await db.query(query, [boardID, userID]);
    } catch (err) {
        throw new Error("Error removing board");
    }
}
