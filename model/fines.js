import { pool } from "../database.js";
import IdGenerator from "./reusableFunctions/functionToCreateID.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import deleteRowByID from "./reusableFunctions/delateRowByID.js";

const tableName = 'fines';
const idHoldingColumnName = 'fineID';

const fineModel = {
    insertFine: async (amount, datePaid, fs_transactionID) => {
        const fineID = IdGenerator("fineID", "fines", "fine");
        const query = 'INSERT INTO fines (fineID, amount, datePaid, fs_transactionID) VALUES (?,?,?,?)';
        try {
            await pool.query(query, [fineID, amount, datePaid, fs_transactionID]);
        } catch (error) {
            console.log(`Error In inserting into Fine Table: ${error.message}`);
        }
    },

    getAllFines: async () => {
        await getAllRows(tableName);
    },

    getFineByID: async (id) => {
        await getRowByID(tableName, idHoldingColumnName, id);
    },

    updateFine: async (id, amount, datePaid, fs_transactionID) => {
        const query = 'UPDATE fines SET amount=?, datePaid=?, fs_transactionID=? WHERE fineID=?';
        try {
            await pool.query(query, [amount, datePaid, fs_transactionID, id]);
        } catch (error) {
            console.log('Error in Updating Fine');
        }
    },

    deleteFine: async (id) => {
        await deleteRowByID(tableName, idHoldingColumnName, id);
    }
};

export default fineModel;
