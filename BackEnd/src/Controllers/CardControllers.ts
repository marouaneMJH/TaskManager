import db from "./../Config/PgConfig.js";

export const getCardInfoById = async (cardID: string,userID:string) => {
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

    const result = await db.query(query, [cardID ,userID]);
    return result.rows;
};

export const getCardsByListId = async (userID: string, listID:number) => {
    // Retrieve all cards created by a user based on their userID,
    const query = `SELECT c."cardID", c."cardTitle"
                FROM "users" 
                JOIN "boards" b ON u."userID" = b."userID"
                JOIN "lists" l ON b."boardID" = l."boardID"
                JOIN "cards" c ON l."listID" = c."listID"
                WHERE u."userID" = $1;
`;
    const result = await db.query(query, [userID]);
    return result.rows;
};

export const addNewCard = async (
    userID: string,
    listID: number,
    title: string
) => {
    //todo input validation
    const date = new Date().toISOString();
    console.log(date);
    const query = `INSERT INTO "cards" ("cardTitle", "listID", "createdAt")
                VALUES ($1, $2, $3) WHERE "userID"=$4`;
    const result = await db.query(query, [title, listID, date,userID]);
    return result;
};
