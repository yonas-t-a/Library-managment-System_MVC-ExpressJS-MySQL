import { pool } from "../../database.js";

/**
 * @async
 * @function deleteRowByID
 * @param {String} tableName - Name of the table to perform delate row action
 * @param {String} idColumnName - Name of the Id holding counm
 * @param {String} id - Id of to be deleted Row
 * @throws {Error} 
 * @returns {Promise <void>} 
 */

export default async function deleteRowByID(tableName, idHoldingColumnName, id) {
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
        await pool.query(query, [tableName, idHoldingColumnName, id])
    } catch (error) {
        console.log(`Error in Delating a row with the give ID`)
    }
}
