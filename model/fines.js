import { pool } from "../database.js";
import IdGenerator from "./reusableFunctions/functionToCreateID.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import deleteRowByID from "./reusableFunctions/delateRowByID.js";
import selectSpecificAttributesCell from "./reusableFunctions/selectSpecificCell.js";

const tableName = 'fines';
const idHoldingColumnName = 'fineID';

const fineModel = {
    fineAmount: async (id) => {
        const result = await selectSpecificAttributesCell("amount", tableName, idHoldingColumnName, id);
        return result;
    },

    finePaidStatus: async (id) => {
        const result = await selectSpecificAttributesCell("paidStatus", tableName, idHoldingColumnName, id);
        return result;
    },

    fineDatePaid: async (id) => {
        const result = await selectSpecificAttributesCell("datePaid", tableName, idHoldingColumnName, id);
        return result;
    },

    fineTransactionID: async (id) => {
        const result = await selectSpecificAttributesCell("fs_transactionID", tableName, idHoldingColumnName, id);
        return result;
    },

    insertFine: async (amount, paidStatus, datePaid, fs_transactionID) => {
        const fineID = await IdGenerator("fineID", "fines", "fine");
        const query = 'INSERT INTO fines (fineID, amount, paidStatus, datePaid, fs_transactionID) VALUES (?,?,?,?,?)';
        try {
            await pool.query(query, [fineID, amount, paidStatus, datePaid, fs_transactionID]);
        } catch (error) {
            console.log(`Error In inserting into Fine Table: ${error.message}`);
        }
    },

    getAllFines: async () => {
        const result = await getAllRows(tableName);
        return result;
    },

    getFineByID: async (id) => {
        const result = await getRowByID(tableName, idHoldingColumnName, id);
        return result;
    },

    updateFine: async (id, amount, paidStatus, datePaid, fs_transactionID) => {
        const query = `
            UPDATE fines 
            SET amount = ?, paidStatus = ?, datePaid = ?, fs_transactionID = ? 
            WHERE fineID = ?
        `;
        try {
            const [result] = await pool.query(query, [
                amount,
                paidStatus,
                datePaid,
                fs_transactionID,
                id,
            ]);
            console.log('Fine updated successfully:', result);
            return result;
        } catch (error) {
            console.error(`Error in Updating Fine (ID: ${id}):`, error.message);
        }
    },
    

    deleteFine: async (id) => {
        const result = await deleteRowByID(tableName, idHoldingColumnName, id);
        return result;
    }
};

export default fineModel;
