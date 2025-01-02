import { pool } from "../database.js";
import IdGenerator from "./reusableFunctions/functionToCreateID.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import deleteRowByID from "./reusableFunctions/delateRowByID.js";

const tableName = 'nonMemberBorrower';
const idHoldingColumnName = 'borrowID';

const nonMemberBorrowerModel = {
    insertNonMemberBorrower: async (name, address, phone_number, IDProof_Status, status) => {
        const borrowID = IdGenerator("borrowID", "nonMemberBorrower", "borrow");
        const query = 'INSERT INTO nonMemberBorrower (borrowID, name, address, phone_number, IDProof_Status, status) VALUES (?,?,?,?,?,?)';
        try {
            await pool.query(query, [borrowID, name, address, phone_number, IDProof_Status, status]);
        } catch (error) {
            console.log(`Error In inserting into Non-Member Borrower Table: ${error.message}`);
        }
    },

    getAllNonMembers: async () => {
        await getAllRows(tableName);
    },

    getNonMemberByID: async (id) => {
        await getRowByID(tableName, idHoldingColumnName, id);
    },

    updateNonMember: async (id, name, address, phone_number, IDProof_Status, status) => {
        const query = 'UPDATE nonMemberBorrower SET name=?, address=?, phone_number=?, IDProof_Status=?, status=? WHERE borrowID=?';
        try {
            await pool.query(query, [name, address, phone_number, IDProof_Status, status, id]);
        } catch (error) {
            console.log('Error in Updating Non-Member Borrower');
        }
    },

    deleteNonMember: async (id) => {
        await deleteRowByID(tableName, idHoldingColumnName, id);
    }
};

export default nonMemberBorrowerModel;
