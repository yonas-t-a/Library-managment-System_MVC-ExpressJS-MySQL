import { pool } from "../database.js";

import IdGenerator from "./reusableFunctions/functionToCreateID.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import deleteRowByID from "./reusableFunctions/delateRowByID.js";

const tableName = 'admin'
const idHoldingColumnName = 'adminID'

const adminModel = {
    insertAdmin: async (name, phone_number, email, password) => {
        const adminID = IdGenerator("adminID", "admin", "admin");
        const query = 'INSERT INTO admin (adminID ,name, phone_number, email, password) VALUES (?,?,?,?,?)'
        try {
            await pool.query(query, [adminID, name, phone_number, email,password])
        } catch (error) {
            console.log(`Error In inserting to Admin Table: ${error.meesage}`)
        }
    },
    getAllAdmins: async () =>{
        getAllRows(tableName)
    },
    getAdminByID: async(id)=>{
        getRowByID(tableName, idHoldingColumnName, id)
    },

    
}

export default adminModel;