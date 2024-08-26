import { query } from "express";
import db from "./../Config/PgConfig.js";

export const getListInfos = async (userID:string) => {
    try {
        /*
        This query retrieves the names of all lists (listName) created by a specific user,identified by their userID. It joins the users,boards, and lists tables to filter the lists associated with the user's boards.
        */
        const query =`SELECT l."listName", l."listID"
                    FROM "users" u
                    JOIN "boards" b ON u."userID" = b."userID"
                    JOIN "lists" l ON b."boardID" = l."boardID"
                    WHERE u."userID" = $1;`;
        const result = await db.query(query,[userID]);
        return result.rows;
    } catch (error) {
        console.error("Error fetching lists:", error.message);
        return []; // Return an empty array in case of error
    }
};
