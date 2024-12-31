import { pool } from "../../database.js";

export default async function IdGenerator(IDColName,tableName, newIDPrefix) {
    const query = `SELECT ?? AS id from ?? ORDER BY id DESC LIMIT  1`
    try {
        const [rows] = await pool.query(query, [IDColName, tableName]);
        
        let new_id;
        if (rows.length == 0){
            new_id = `${newIDPrefix}_0001`
        } else {
            const lastID = rows[0].id;
            const lastIDNumber = parseInt(lastID.split('_')[1], 10); 
            new_id = `${newIDPrefix}_${String(lastIDNumber + 1).padStart(4, '0')}`; 
        }
        return new_id;
    } catch (error) {
        console.log(`Error in Creating ID, for IdGenerator Function: ${error.message}`);
        throw error;
    }
}

