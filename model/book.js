import { pool } from "../database.js";
import IdGenerator from "./reusableFunctions/functionToCreateID.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import deleteRowByID from "./reusableFunctions/delateRowByID.js";
import selectSpecificAttributesCell from "./reusableFunctions/selectSpecificCell.js";

const tableName = "book";
const idHoldingColumnName = "bookID";

const bookModel = {
    bookTitle: async (id) => {
        const result = await selectSpecificAttributesCell("title", tableName, idHoldingColumnName, id);
        return result;
    },
    bookAuthor: async (id) => {
        const result = await selectSpecificAttributesCell("author", tableName, idHoldingColumnName, id);
        return result;
    },
    bookISBN: async (id) => {
        const result = await selectSpecificAttributesCell("ISBN", tableName, idHoldingColumnName, id);
        return result;
    },
    bookPublisher: async (id) => {
        const result = await selectSpecificAttributesCell("publisher", tableName, idHoldingColumnName, id);
        return result;
    },
    bookCatagoryID: async (id) => {
        const result = await selectSpecificAttributesCell("book_catagoryID", tableName, idHoldingColumnName, id);
        return result;
    },
    bookShelveCode: async (id) => {
        const result = await selectSpecificAttributesCell("book_shelveCode", tableName, idHoldingColumnName, id);
        return result
    },
    insertBook: async (title, author, ISBN, publisher, book_catagoryID, book_shelveCode) => {
        // const bookID = await IdGenerator("bookID", "book", "book");
        const query = `
            INSERT INTO book (title, author, ISBN, publisher, book_catagoryID, book_shelveCode)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        try {
            await pool.query(query, [title, author, ISBN, publisher, book_catagoryID, book_shelveCode]);
        } catch (error) {
            console.log(`Error in inserting to Book table: ${error}`);
        }
    },
    getAllBooks: async () => {
        const result = await getAllRows(tableName);
        return result;
    },
    getBookByID: async (id) => {
        const result = await getRowByID(tableName, idHoldingColumnName, id);
        return result;
    },
    updateBook: async (id, title, author, ISBN, publisher, book_catagoryID, book_shelveCode) => {
        const query = `
            UPDATE book
            SET title = ?, author = ?, ISBN = ?, publisher = ?, book_catagoryID = ?, book_shelveCode = ?
            WHERE bookID = ?
        `;
        try {
            await pool.query(query, [title, author, ISBN, publisher, book_catagoryID, book_shelveCode, id]);
        } catch (error) {
            console.log(`Error in updating Book: ${error.message}`);
        }
    },
    deleteBook: async (id) => {
        const result = await deleteRowByID(tableName, idHoldingColumnName, id);
        return result;
    }
};

export default bookModel;
