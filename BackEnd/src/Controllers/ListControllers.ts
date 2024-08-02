import db from './../Config/PgConfig.js'

// const result = await ListsTitle("SELECT listname, listID FROM lists;");


export const getListInfos = async ()=>{

    try{
        const result = await db.query("SELECT listName, listID FROM lists;");
        return result.rows;
    }catch(error){
        console.error("Error fetching lists:", error.message);
        return []; // Return an empty array in case of error
    }
}
