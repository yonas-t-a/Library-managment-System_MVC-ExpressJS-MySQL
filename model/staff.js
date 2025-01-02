import { pool } from "../database.js";
import IdGenerator from "./reusableFunctions/functionToCreateID.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import deleteRowByID from "./reusableFunctions/delateRowByID.js";

const tableName = 'staff';
const idHoldingColumnName = 'staffID';

const staffModel = {
    insertStaff: async (name, role, phone_number, email, hire_Date, salary, st_brancheID, st_adminID) => {
        const staffID = IdGenerator("staffID", "staff", "staff");
        const query = 'INSERT INTO staff (staffID, name, role, phone_number, email, hire_Date, salary, st_brancheID, st_adminID) VALUES (?,?,?,?,?,?,?,?,?)';
        try {
            await pool.query(query, [staffID, name, role, phone_number, email, hire_Date, salary, st_brancheID, st_adminID]);
        } catch (error) {
            console.log(`Error In inserting into Staff Table: ${error.message}`);
        }
    },

    getAllStaff: async () => {
        await getAllRows(tableName);
    },

    getStaffByID: async (staffID) => {
        await getRowByID(tableName, idHoldingColumnName, staffID);
    },

    updateStaff: async (staffID, name, role, phone_number, email, hire_Date, salary, st_brancheID, st_adminID) => {
        const query = 'UPDATE staff SET name=?, role=?, phone_number=?, email=?, hire_Date=?, salary=?, st_brancheID=?, st_adminID=? WHERE staffID=?';
        try {
            await pool.query(query, [name, role, phone_number, email, hire_Date, salary, st_brancheID, st_adminID, staffID]);
        } catch (error) {
            console.log('Error in Updating Staff');
        }
    },

    deleteStaff: async (staffID) => {
        await deleteRowByID(tableName, idHoldingColumnName, staffID);
    }
};

export default staffModel;
