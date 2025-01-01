import { pool } from "../../database.js";

export default async function getRowByID(tableName, idHoldingColumnName, id) {
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

    if(!allowdNameOfDatabase.includes(tableName)){
        throw new Error(`Invalid table name: ${tableName}`)
    }

    const query = 'SELECT * FROM ?? WHERE ??=?'
    try {
        const [data] = await pool.query(query, [tableName, idHoldingColumnName, id])
        return data
    } catch (error) {
        console.log(`Error in getting the row By the give ID of table=${tableName}`)
    }
}
