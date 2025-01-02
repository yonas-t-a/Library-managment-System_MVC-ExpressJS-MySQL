import { pool } from "../../database.js";

export default async function selectSpecificAttributesCell(columnName,tableName,idHoldingColumnName,id) {
    const query = 'SELECT ?? FROM ?? WHERE ??=?';
    try {
        const result = await pool.query(query, [columnName, tableName, idHoldingColumnName, id])
        return result;
    } catch (error) {
        console.log(`|Model|Error in obtaining ${columnName} for ${tableName}: ${error.meesage}`)
    }
}