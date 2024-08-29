import db from "./../Config/PgConfig.js";
import { TitleInputSchema } from "../Models/Schema.js";

export const getListInfos = async (userID: string, boardID: string) => {
    try {
        const query = `SELECT list."listID", list."listName"
                        FROM "lists" list 
                        JOIN "boards" board ON list."boardID" = board."boardID"
                        WHERE board."userID" = $1 AND board."boardID"=$2;`;
        const result = await db.query(query, [userID, boardID]);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

// Add list
export async function addList(
    listName: string,
    boardID: string,
    userID:string
): Promise<void> {
    try {
        const query = `INSERT INTO "lists"("listName", "boardID")
                        SELECT $1, "boardID"
                        FROM "boards"
                        WHERE "boardID" = $2 AND "userID" = $3;`;
        const result = await db.query(query, [
            TitleInputSchema.parse(listName),
            boardID,
            userID
        ]);
        return result;
    } catch (err) {
        throw new Error("Error removing lis");
    }
}

// edit List
export async function editList(
    listID: string,
    listName: string,
    userID: string
): Promise<void> {
    try {
        const query = `
                    UPDATE "lists"
                    SET "listName" = $1
                    WHERE "listID" = $2 
                    AND "boardID" IN (SELECT "boardID" FROM "boards" WHERE "userID" = $3);

        `;
        await db.query(query, [
            TitleInputSchema.parse(listName),
            listID,
            userID,
        ]);
    } catch (err) {
        throw new Error("Error updating list");
    }
}

// Remove list
export async function removeList(
    listID: string,
    userID: string
): Promise<void> {
    try {
        const query = `
        DELETE FROM "lists"
        WHERE "listID" = $1 
        AND "boardID" IN (SELECT "boardID" FROM "boards" WHERE "userID" = $2);
    `;
    
        await db.query(query, [listID, userID]);
    } catch (err) {
        throw new Error("Error removing list");
    }
}
