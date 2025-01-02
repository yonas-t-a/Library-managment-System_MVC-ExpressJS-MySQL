import { pool } from "../database.js";
import IdGenerator from "./reusableFunctions/functionToCreateID.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import deleteRowByID from "./reusableFunctions/delateRowByID.js";

const tableName = 'book';
const idHoldingColumnName = 'bookID';

const bookModel = {
    insertBook: async (title, author, ISBN, publisher, book_catagoryID, book_shelveCode) => {
        const bookID = IdGenerator("bookID", "book", "book");
        const query = 'INSERT INTO book (bookID, title, author, ISBN, publisher, book_catagoryID, book_shelveCode) VALUES (?,?,?,?,?,?,?)';
        try {
            await pool.query(query, [bookID, title, author, ISBN, publisher, book_catagoryID, book_shelveCode]);
        } catch (error) {
            console.log(`Error In inserting to Book Table: ${error.message}`);
        }
    },

    getAllBooks: async () => {
        await getAllRows(tableName);
    },

    getBookByID: async (id) => {
        await getRowByID(tableName, idHoldingColumnName, id);
    },
    updateBook: async (id, title, author, ISBN, publisher, book_catagoryID, book_shelveCode) => {
        const query = 'UPDATE book SET title=?, author=?, ISBN=?, publisher=?, book_catagoryID=?, book_shelveCode=? WHERE bookID=?';
        try {
            await pool.query(query, [title, author, ISBN, publisher, book_catagoryID, book_shelveCode, id]);
        } catch (error) {
            console.log('Error in Updating Book');
        }
    },
    deleteBook: async (id) => {
        await deleteRowByID(tableName, idHoldingColumnName, id);
    }
};

export default bookModel;
