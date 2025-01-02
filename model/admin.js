import { pool } from "../database.js";

import IdGenerator from "./reusableFunctions/functionToCreateID.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import deleteRowByID from "./reusableFunctions/delateRowByID.js";
import selectSpecificAttributesCell from "./reusableFunctions/selectSpecificCell.js";

const tableName = 'admin'
const idHoldingColumnName = 'adminID'


const adminModel = {
    adminName : async (id) => {
        const result = await selectSpecificAttributesCell("name", tableName,idHoldingColumnName, id);
        return result;
    },
    adminPhone_number: async (id)=>{
        const result =  await selectSpecificAttributesCell("phone_number", tableName, idHoldingColumnName, id);
        return result;
    },
    adminEmail: async (id) => {
        const result = await selectSpecificAttributesCell("email", tableName, idHoldingColumnName, id);
        return result;
    },
    adminPassword: async (id) => {
        const result = await selectSpecificAttributesCell("password", tableName, idHoldingColumnName, id);
    },
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
        const result = await getAllRows(tableName);
        return result
    },
    getAdminByID: async(id)=>{
        const result = await getRowByID(tableName, idHoldingColumnName, id);
        return result 
    },
    updateAdmin: async (id, name, phone_number, email, password) => {
        const query = 'UPDATE admin SET name=?, phone_number=?, email=?, password=? WHERE id=?'
        try {
            await pool.query(query, [name, phone_number, email, password, id])
        } catch (error) {
            console.log('Error in Updating Admin')
        }

    },
    deleteAdmin: async (id) => {
        const result = await deleteRowByID(tableName, idHoldingColumnName, id)
        return result
    }
}

export default adminModel;