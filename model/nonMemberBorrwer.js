import { pool } from "../database.js";
import IdGenerator from "./reusableFunctions/functionToCreateID.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import deleteRowByID from "./reusableFunctions/delateRowByID.js";
import selectSpecificAttributesCell from "./reusableFunctions/selectSpecificCell.js";

const tableName = 'nonMemberBorrower';
const idHoldingColumnName = 'borrowID';

const nonMemberBorrowerModel = {
    nonMemberName: async (id) => {
        const result = await selectSpecificAttributesCell("name", tableName, idHoldingColumnName, id);
        return result;
    },

    nonMemberAddress: async (id) => {
        const result = await selectSpecificAttributesCell("address", tableName, idHoldingColumnName, id);
        return result;
    },

    nonMemberPhoneNumber: async (id) => {
        const result = await selectSpecificAttributesCell("phone_number", tableName, idHoldingColumnName, id);
        return result;
    },

    nonMemberIDProofStatus: async (id) => {
        const result = await selectSpecificAttributesCell("IDProof_Status", tableName, idHoldingColumnName, id);
        return result;
    },

    nonMemberStatus: async (id) => {
        const result = await selectSpecificAttributesCell("status", tableName, idHoldingColumnName, id);
        return result;
    },

    insertNonMemberBorrower: async (name, address, phone_number, IDProof_Status, status) => {
        const borrowID = IdGenerator("borrowID", "nonMemberBorrower", "borrow");
        const query = 'INSERT INTO nonMemberBorrower (borrowID, name, address, phone_number, IDProof_Status, status) VALUES (?,?,?,?,?,?)';
        try {
            await pool.query(query, [borrowID, name, address, phone_number, IDProof_Status, status]);
        } catch (error) {
            console.log(`Error in inserting into Non-Member Borrower Table: ${error.message}`);
        }
    },

    getAllNonMembers: async () => {
        const result = await getAllRows(tableName);
        return result;
    },

    getNonMemberByID: async (id) => {
        const result = await getRowByID(tableName, idHoldingColumnName, id);
        return result;
    },

    updateNonMember: async (id, name, address, phone_number, IDProof_Status, status) => {
        const query = 'UPDATE nonMemberBorrower SET name=?, address=?, phone_number=?, IDProof_Status=?, status=? WHERE borrowID=?';
        try {
            await pool.query(query, [name, address, phone_number, IDProof_Status, status, id]);
        } catch (error) {
            console.log('Error in Updating Non-Member Borrower:', error.message);
        }
    },

    deleteNonMember: async (id) => {
        const result = await deleteRowByID(tableName, idHoldingColumnName, id);
        return result;
    }
};

export default nonMemberBorrowerModel;
