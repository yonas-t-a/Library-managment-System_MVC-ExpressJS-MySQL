import { pool } from "../../database.js";


export default async function deleteRowByID(tableName, idColumnName, id) {
    const allowdNameOfDatabase = [
        "admin",
        "book",
        "branches",
        "catagories",
        "fines",
        "member",
        "nonMemberBorrower",
        "reservation",
        "shelves",
        "staff",
        "transaction",
        "shelfWithCatagory"      
    ]

    if (!allowdNameOfDatabase.includes(tableName)){
        throw new Error(`Invalid table name: ${tableName}`)
    }

    const query = 'DELETE FROM ?? WHERE ??=?'
    try {
        await pool.query(query, [tableName, idColumnName, id])
    } catch (error) {
        console.log(`Error in Delating a row with the give ID`)
    }
}
