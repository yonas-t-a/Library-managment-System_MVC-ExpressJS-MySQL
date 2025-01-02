import { pool } from "../database.js";
import IdGenerator from "./reusableFunctions/functionToCreateID.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import deleteRowByID from "./reusableFunctions/delateRowByID.js";
import selectSpecificAttributesCell from "./reusableFunctions/selectSpecificCell.js";

const tableName = 'transaction';
const idHoldingColumnName = 'transactionID';

const transactionModel = {
    transactionIssueDate: async (id) => {
        const result = await selectSpecificAttributesCell("issueDate", tableName, idHoldingColumnName, id);
        return result;
    },
    transactionDueDate: async (id) => {
        const result = await selectSpecificAttributesCell("dueDate", tableName, idHoldingColumnName, id);
        return result;
    },
    transactionReturnDate: async (id) => {
        const result = await selectSpecificAttributesCell("returnDate", tableName, idHoldingColumnName, id);
        return result;
    },
    transactionMemberID: async (id) => {
        const result = await selectSpecificAttributesCell("tl_memberID", tableName, idHoldingColumnName, id);
        return result;
    },
    transactionBorrowID: async (id) => {
        const result = await selectSpecificAttributesCell("tl_borrowID", tableName, idHoldingColumnName, id);
        return result;
    },
    transactionBookID: async (id) => {
        const result = await selectSpecificAttributesCell("tl_bookID", tableName, idHoldingColumnName, id);
        return result;
    },

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
        const result = await getAllRows(tableName);
        return result;
    },

    getTransactionByID: async (transactionID) => {
        const result = await getRowByID(tableName, idHoldingColumnName, transactionID);
        return result;
    },

    updateTransaction: async (transactionID, issueDate, dueDate, returnDate, tl_memberID, tl_borrowID, tl_bookID) => {
        const query = 'UPDATE transaction SET issueDate=?, dueDate=?, returnDate=?, tl_memberID=?, tl_borrowID=?, tl_bookID=? WHERE transactionID=?';
        try {
            await pool.query(query, [issueDate, dueDate, returnDate, tl_memberID, tl_borrowID, tl_bookID, transactionID]);
        } catch (error) {
            console.log(`Error in updating Transaction: ${error.message}`);
        }
    },

    deleteTransaction: async (transactionID) => {
        const result = await deleteRowByID(tableName, idHoldingColumnName, transactionID);
        return result;
    }
};

export default transactionModel;