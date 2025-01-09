import { pool } from "../database.js";
import IdGenerator from "./reusableFunctions/functionToCreateID.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import deleteRowByID from "./reusableFunctions/delateRowByID.js";
import selectSpecificAttributesCell from "./reusableFunctions/selectSpecificCell.js";

const tableName = 'branches';
const idHoldingColumnName = 'brancheID';

const branchModel = {
    branchAddress: async (id) => {
        const result = await selectSpecificAttributesCell("address", tableName, idHoldingColumnName, id);
        return result;
    },
    branchPhoneNumber: async (id) => {
        const result = await selectSpecificAttributesCell("phone_number", tableName, idHoldingColumnName, id);
        return result;
    },
    branchEmail: async (id) => {
        const result = await selectSpecificAttributesCell("email", tableName, idHoldingColumnName, id);
        return result;
    },
    branchAdminID: async (id) => {
        const result = await selectSpecificAttributesCell("br_adminID", tableName, idHoldingColumnName, id);
        return result;
    },
    branchAdminID: async (id) =>{
        const result = await selectSpecificAttributesCell("br_adminID", tableName, idHoldingColumnName, id);
        return result
    },
    insertBranch: async (address, phone_number, email, br_adminID) => {
        const brancheID = await IdGenerator("brancheID", "branches", "branch");
        const query = 'INSERT INTO branches (brancheID, address, phone_number, email, br_adminID) VALUES (?,?,?,?,?)';
        try {
            await pool.query(query, [brancheID, address, phone_number, email, br_adminID]);
        } catch (error) {
            console.log(`Error in inserting into Branch Table: ${error.message}`);
        }
    },

    getAllBranches: async () => {
        const result = await getAllRows(tableName);
        return result;
    },
    getBranchByID: async (id) => {
        const result = await getRowByID(tableName, idHoldingColumnName, id);
        return result;
    },

    updateBranch: async (id, address, phone_number, email, br_adminID) => {
        const query = 'UPDATE branches SET address=?, phone_number=?, email=?, br_adminID=? WHERE brancheID=?';
        try {
            await pool.query(query, [address, phone_number, email, br_adminID, id]);
        } catch (error) {
            console.log(`Error in updating Branch: ${error.message}`);
        }
    },

    deleteBranch: async (id) => {
        const result = await deleteRowByID(tableName, idHoldingColumnName, id);
        return result;
    }
};

export default branchModel;

