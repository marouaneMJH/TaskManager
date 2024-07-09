import pg from "pg";
import db from "./ConnectClient.js";

const GetTaskFromDB = async () => {
    try {
        const result = await db.query("SELECT * FROM tasks");
        const returnedData = result.rows;

        // console.log(typeof returnedData);
        // console.log(returnedData);
        return returnedData;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export default GetTaskFromDB;
