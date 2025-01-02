import { pool } from "../database.js";
import IdGenerator from "./reusableFunctions/functionToCreateID.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import deleteRowByID from "./reusableFunctions/delateRowByID.js";

const tableName = 'catagories';
const idHoldingColumnName = 'catagoryID';

const categoryModel = {
    insertCategory: async (catagoryName, description) => {
        const catagoryID = IdGenerator("catagoryID", "catagories", "category");
        const query = 'INSERT INTO catagories (catagoryID, catagoryName, description) VALUES (?,?,?)';
        try {
            await pool.query(query, [catagoryID, catagoryName, description]);
        } catch (error) {
            console.log(`Error In inserting into Category Table: ${error.message}`);
        }
    },

    getAllCategories: async () => {
        await getAllRows(tableName);
    },

    getCategoryByID: async (id) => {
        await getRowByID(tableName, idHoldingColumnName, id);
    },

    updateCategory: async (id, catagoryName, description) => {
        const query = 'UPDATE catagories SET catagoryName=?, description=? WHERE catagoryID=?';
        try {
            await pool.query(query, [catagoryName, description, id]);
        } catch (error) {
            console.log('Error in Updating Category');
        }
    },

    deleteCategory: async (id) => {
        await deleteRowByID(tableName, idHoldingColumnName, id);
    }
};

export default categoryModel;
