import db from "./../Config/PgConfig.js";

export const getCardInfoById = async (id:number) => {
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
    c."cardID" = $1;

`;

    const result = await db.query(query, [id]);
    return result.rows;
};

export const getCardsByListId = async (listID:number) => {
    const query = 'SELECT "cardID", "cardTitle" FROM "cards" WHERE "listID" = $1';
    const result = await db.query(query, [listID]);
    return result.rows;
};
