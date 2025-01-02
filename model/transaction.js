import { pool } from "../database.js";
import IdGenerator from "./reusableFunctions/functionToCreateID.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import deleteRowByID from "./reusableFunctions/delateRowByID.js";

const tableName = 'transaction';
const idHoldingColumnName = 'transactionID';

const transactionModel = {
    insertTransaction: async (issueDate, dueDate, returnDate, tl_memberID, tl_borrowID, tl_bookID) => {
        const transactionID = IdGenerator("transactionID", "transaction", "transaction");
        const query = 'INSERT INTO transaction (transactionID, issueDate, dueDate, returnDate, tl_memberID, tl_borrowID, tl_bookID) VALUES (?,?,?,?,?,?,?)';
        try {
            await pool.query(query, [transactionID, issueDate, dueDate, returnDate, tl_memberID, tl_borrowID, tl_bookID]);
        } catch (error) {
            console.log(`Error in inserting into Transaction Table: ${error.message}`);
        }
    },

    getAllTransactions: async () => {
        await getAllRows(tableName);
    },

    getTransactionByID: async (transactionID) => {
        await getRowByID(tableName, idHoldingColumnName, transactionID);
    },

    updateTransaction: async (transactionID, issueDate, dueDate, returnDate, tl_memberID, tl_borrowID, tl_bookID) => {
        const query = 'UPDATE transaction SET issueDate=?, dueDate=?, returnDate=?, tl_memberID=?, tl_borrowID=?, tl_bookID=? WHERE transactionID=?';
        try {
            await pool.query(query, [issueDate, dueDate, returnDate, tl_memberID, tl_borrowID, tl_bookID, transactionID]);
        } catch (error) {
            console.log('Error in updating Transaction');
        }
    },

    deleteTransaction: async (transactionID) => {
        await deleteRowByID(tableName, idHoldingColumnName, transactionID);
    }
};

export default transactionModel;
