import { pool } from "../database.js";
import IdGenerator from "./reusableFunctions/functionToCreateID.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import deleteRowByID from "./reusableFunctions/delateRowByID.js";

const tableName = 'branches';
const idHoldingColumnName = 'brancheID';

const branchModel = {
    insertBranch: async (address, phone_number, email, br_adminID) => {
        const brancheID = IdGenerator("brancheID", "branches", "branch");
        const query = 'INSERT INTO branches (brancheID, address, phone_number, email, br_adminID) VALUES (?,?,?,?,?)';
        try {
            await pool.query(query, [brancheID, address, phone_number, email, br_adminID]);
        } catch (error) {
            console.log(`Error In inserting into Branch Table: ${error.message}`);
        }
    },

    getAllBranches: async () => {
        await getAllRows(tableName);
    },

    getBranchByID: async (id) => {
        await getRowByID(tableName, idHoldingColumnName, id);
    },

    updateBranch: async (id, address, phone_number, email, br_adminID) => {
        const query = 'UPDATE branches SET address=?, phone_number=?, email=?, br_adminID=? WHERE brancheID=?';
        try {
            await pool.query(query, [address, phone_number, email, br_adminID, id]);
        } catch (error) {
            console.log('Error in Updating Branch');
        }
    },

    deleteBranch: async (id) => {
        await deleteRowByID(tableName, idHoldingColumnName, id);
    }
};

export default branchModel;
