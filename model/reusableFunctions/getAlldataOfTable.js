import { pool } from "../../database";



export default async function getAllRows(tableName){
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
    
    const query = 'SELECT * FROM ??'
    try {
        const [data] = await pool.query(query, [tableName])
    } catch (error) {
        console.log(`Error in gatting all the rows of ${tableName}: ${error.message} `)
        throw error;
    }
}