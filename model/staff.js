import { pool } from "../database.js";
import IdGenerator from "./reusableFunctions/functionToCreateID.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import deleteRowByID from "./reusableFunctions/delateRowByID.js";
import selectSpecificAttributesCell from "./reusableFunctions/selectSpecificCell.js";

const tableName = 'staff';
const idHoldingColumnName = 'staffID';

const staffModel = {
    // Get staff name by staffID
    staffName: async (staffID) => {
        const result = await selectSpecificAttributesCell("name", tableName, idHoldingColumnName, { staffID });
        return result;
    },

    // Get staff role by staffID
    staffRole: async (staffID) => {
        const result = await selectSpecificAttributesCell("role", tableName, idHoldingColumnName, { staffID });
        return result;
    },

    // Get staff phone number by staffID
    staffPhoneNumber: async (staffID) => {
        const result = await selectSpecificAttributesCell("phone_number", tableName, idHoldingColumnName, { staffID });
        return result;
    },

    // Get staff email by staffID
    staffEmail: async (staffID) => {
        const result = await selectSpecificAttributesCell("email", tableName, idHoldingColumnName, { staffID });
        return result;
    },

    // Get staff hire date by staffID
    staffHireDate: async (staffID) => {
        const result = await selectSpecificAttributesCell("hire_Date", tableName, idHoldingColumnName, { staffID });
        return result;
    },

    // Get staff salary by staffID
    staffSalary: async (staffID) => {
        const result = await selectSpecificAttributesCell("salary", tableName, idHoldingColumnName, { staffID });
        return result;
    },

    staffBranchID: async (staffID) => {
        const result = await selectSpecificAttributesCell("st_brancheID", tableName, idHoldingColumnName, { staffID });
        return result;
    },

    staffAdminID: async (staffID) => {
        const result = await selectSpecificAttributesCell("st_adminID", tableName, idHoldingColumnName, { staffID });
        return result;
    },

    insertStaff: async (name, role, phone_number, email, hire_Date, salary, st_brancheID, st_adminID) => {
        const staffID = await IdGenerator("staffID", "staff", "staff");
        const query = 'INSERT INTO staff (staffID, name, role, phone_number, email, hire_Date, salary, st_brancheID, st_adminID) VALUES (?,?,?,?,?,?,?,?,?)';
        try {
            await pool.query(query, [staffID, name, role, phone_number, email, hire_Date, salary, st_brancheID, st_adminID]);
        } catch (error) {
            console.log(`Error In inserting into Staff Table: ${error.message}`);
        }
    },

    getAllStaff: async () => {
        const result = await getAllRows(tableName);
        return result;
    },

    getStaffByID: async (staffID) => {
        const result = await getRowByID(tableName, idHoldingColumnName, staffID);
        return result;
    },

    updateStaff: async (staffID, name, role, phone_number, email, hire_Date, salary, st_brancheID, st_adminID) => {
        const query = 'UPDATE staff SET name=?, role=?, phone_number=?, email=?, hire_Date=?, salary=?, st_brancheID=?, st_adminID=? WHERE staffID=?';
        try {
            await pool.query(query, [name, role, phone_number, email, hire_Date, salary, st_brancheID, st_adminID, staffID]);
        } catch (error) {
            console.log('Error in updating Staff: ' + error.message);
        }
    },

    deleteStaff: async (staffID) => {
        const result = await deleteRowByID(tableName, idHoldingColumnName, staffID);
        return result;
    }
};

export default staffModel;
