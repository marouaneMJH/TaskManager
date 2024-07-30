import db from "../Config/PgConfig.js";
import { List } from "../Interfaces/List.js";

const Lists = async (queryRequest: string): Promise<List[]> => {
    try {
        const result = await db.query(queryRequest);
        return result.rows;
    } catch (error) {
        console.error("Error fetching lists:", error.message);
        return []; // Return an empty array in case  of error
    }
};

export default Lists;
