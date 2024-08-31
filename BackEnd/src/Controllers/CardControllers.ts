import { StringifyOptions } from "querystring";
import db from "./../Config/PgConfig.js";
import Card from "../Interfaces/Card.js";
import CardInfo from "../Interfaces/CardInfo.js";
import { TitleInputSchema,textInputSchema } from "../Models/Schema.js";

/**
 * Retrieves detailed information about a card, including its comments and associated user information.
 *
 * @param {string} cardID - The ID of the card to retrieve.
 * @param {string} userID - The ID of the user requesting the card information.
 * @returns {Promise<CardInfo[]>} A promise that resolves to an array of objects containing the card and comment details.
 * @throws Will throw an error if the database query fails.
 */
export const getCardInfoById = async (
    cardID: string,
    userID: string
): Promise<CardInfo[]> => {
    const query = `
    SELECT 
        c."cardID",
        c."cardTitle",
        c."cardDescription",
        c."createdAt" AS "cardCreatedAt",
        com."commentID",
        com."commentText",
        com."userID" AS "commentUserID",
        u."username" AS "commentUsername",
        com."createdAt" AS "commentCreatedAt"
    FROM 
        "cards" c
    LEFT JOIN 
        "comments" com ON c."cardID" = com."cardID"
    LEFT JOIN 
        "users" u ON com."userID" = u."userID"
    WHERE 
        c."cardID" = $1 AND u."userID"=$2 ;
    `;

    const result = await db.query(query, [cardID, userID]);
    return result.rows;
};

/**
 * Retrieves all cards created by a user based on their userID and listID.
 *
 * @param {string} userID - The ID of the user whose cards are being retrieved.
 * @param {number} listID - The ID of the list where the cards are located.
 * @returns {Promise<Card[]>} A promise that resolves to an array of Card objects containing the cardID and cardTitle.
 * @throws Will throw an error if the database query fails.
 */
export const getCardsByListId = async (
    userID: string,
    listID: number
): Promise<Card[]> => {
    try {
        const query = `SELECT c."cardID", c."cardTitle"
        FROM "users" u
        JOIN "boards" b ON u."userID" = b."userID"
        JOIN "lists" l ON b."boardID" = l."boardID"
        JOIN "cards" c ON l."listID" = c."listID"
        WHERE u."userID" = $1 AND l."listID"=$2;
        `;
        const result = await db.query(query, [userID, listID]);
        return result.rows;
    } catch (err) {
        throw err;
    }
};



export const addNewCard = async (
    userID: string,
    listID: number,
    cardTitle: string
) => {
    try {
        const query = `INSERT INTO "cards"("cardTitle", "listID")
        SELECT $1, "listID"
        FROM "lists"
        WHERE "listID" = $2 AND "boardID" 
        IN (SELECT "boardID" FROM "boards" WHERE "userID" = $3)`;
        const result = await db.query(query, [
            TitleInputSchema.parse(cardTitle),
            listID,
            userID,
        ]);
        return result;
    } catch (err) {
        throw err;
    }
};

/**
 * Updates the title and description of a card.
 *
 * @param {string} cardID - The ID of the card to update.
 * @param {string} userID - The ID of the user updating the card.
 * @param {string} cardTitle - The new title for the card.
 * @param {string} cardDescription - The new description for the card.
 * @returns {Promise<void>} A promise that resolves when the card is successfully updated.
 * @throws Will throw an error if the database query fails.
 */
export const editCard = async (
    userID: string,
    cardInfo: Card,
): Promise<void> => {
    try {
        const query = `
        UPDATE "cards"
        SET "cardTitle" = $1, "cardDescription" = $2
        WHERE "cardID" = $3 AND "listID" IN (
            SELECT "listID" 
            FROM "lists" 
            WHERE "boardID" IN (
                SELECT "boardID" 
                FROM "boards" 
                WHERE "userID" = $4
            )
        )`;
        await db.query(query, [TitleInputSchema.parse(cardInfo.cardTitle), textInputSchema.parse(cardInfo.cardDescription), cardInfo.cardID, userID]);
    } catch (err) {
        throw err;
    }
};

/**
 * Removes a card based on its cardID.
 *
 * @param {string} cardID - The ID of the card to remove.
 * @param {string} userID - The ID of the user attempting to remove the card.
 * @returns {Promise<void>} A promise that resolves when the card is successfully deleted.
 * @throws Will throw an error if the database query fails.
 */
export const removeCard = async (
    cardID: string,
    userID: string
): Promise<void> => {
    try {
        const query = `
        DELETE FROM "cards"
        WHERE "cardID" = $1 AND "listID" IN (
            SELECT "listID" 
            FROM "lists" 
            WHERE "boardID" IN (
                SELECT "boardID" 
                FROM "boards" 
                WHERE "userID" = $2
            )
        )`;
        await db.query(query, [cardID, userID]);
    } catch (err) {
        throw err;
    }
};


