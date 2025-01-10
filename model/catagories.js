import { pool } from "../database.js";
import IdGenerator from "./reusableFunctions/functionToCreateID.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import deleteRowByID from "./reusableFunctions/delateRowByID.js";
import selectSpecificAttributesCell from "./reusableFunctions/selectSpecificCell.js";

const tableName = 'catagories';
const idHoldingColumnName = 'catagoryID';

const categoryModel = {
    categoryName: async (id) => {
        const result = await selectSpecificAttributesCell("catagoryName", tableName, idHoldingColumnName, id);
        return result;
    },

    categoryDescription: async (id) => {
        const result = await selectSpecificAttributesCell("description", tableName, idHoldingColumnName, id);
        return result;
    },

    insertCategory: async (catagoryName, description) => {
        const catagoryID = await IdGenerator("catagoryID", "catagories", "category");
        const query = 'INSERT INTO catagories (catagoryID, catagoryName, description) VALUES (?,?,?)';
        try {
            await pool.query(query, [catagoryID, catagoryName, description]);
        } catch (error) {
            console.log(`Error In inserting into Category Table: ${error.message}`);
        }
    },

    getAllCategories: async () => {
        const result = await getAllRows(tableName);
        return result;
    },

    getCategoryByID: async (id) => {
        const result = await getRowByID(tableName, idHoldingColumnName, id);
        return result;
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
        const result = await deleteRowByID(tableName, idHoldingColumnName, id);
        return result;
    }
};

export default categoryModel;

