import { pool } from "../../database.js";

/**
 * 
 * @param {String} tableName - Name of the table to get row of the given id
 * @param {String} idHoldingColumnName - Name of the Promery Key column name
 * @param {String} id  - id
 * @returns {Promise <JSON>}
 */
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
