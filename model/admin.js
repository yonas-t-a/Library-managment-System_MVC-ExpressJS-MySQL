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
        const adminID = await IdGenerator("adminID", "admin", "admin");  
        const query = 'INSERT INTO admin (adminID, name, phone_number, email, `password`) VALUES (?, ?, ?, ?, ?)';
        try {
            const result = await pool.query(query, [adminID, name, phone_number, email, password]);
            console.log('Admin inserted successfully:', result);
        } catch (error) {
            console.error(`Error In inserting to Admin Table: ${error.message}`);
            console.error(`Query: ${query}`);
            console.error(`Values: ${[adminID, name, phone_number, email, password]}`);
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
        const query = 'UPDATE admin SET name=?, phone_number=?, email=?, password=? WHERE adminID=?'; 
        try {
            const result = await pool.query(query, [name, phone_number, email, password, id]);
            console.log('Admin updated successfully:', result);
        } catch (error) {
            console.log('Error in Updating Admin:', error.message);
            console.error(`Query: ${query}`);
            console.error(`Values: [${name}, ${phone_number}, ${email}, ${password}, ${id}]`);
        }
    },
    
    deleteAdmin: async (id) => {
        const result = await deleteRowByID(tableName, idHoldingColumnName, id)
        return result
    }
}

export default adminModel;