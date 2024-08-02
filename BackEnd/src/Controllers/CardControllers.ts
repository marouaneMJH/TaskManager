import db from "./../Config/PgConfig.js"


export const getCardInfoById = async (id) => {
    const query = `
    SELECT 
      c.CardID,
      c.CardTitle,
      c.CardDescription,
      c.CreatedAt AS CardCreatedAt,
      com.CommentID,
      com.CommentText,
      com.UserID AS CommentUserID,
      u.Username AS CommentUsername,
      com.CreatedAt AS CommentCreatedAt
    FROM 
      Cards c
    LEFT JOIN 
      Comments com ON c.CardID = com.CardID
    LEFT JOIN 
      Users u ON com.UserID = u.UserID
    WHERE 
      c.CardID = $1;
  `;

    const result = await db.query(query, [id]);
    return result.rows;
};

export const getCardsByListId = async (listID) => {
  const query = 'SELECT cardID, cardTitle FROM cards WHERE listID = $1';
  const result = await db.query(query, [listID]);
  return result.rows;
};


