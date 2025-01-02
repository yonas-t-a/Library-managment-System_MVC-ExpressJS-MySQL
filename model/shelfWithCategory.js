import { pool } from "../database.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";

const tableName = 'shelfWithCatagory';
const idHoldingColumnName = 'swc_shelveCode';

const shelfWithCatagoryModel = {
    insertShelfWithCatagory: async (swc_shelveCode, swc_catagoryID) => {
        const query = 'INSERT INTO shelfWithCatagory (swc_shelveCode, swc_catagoryID) VALUES (?, ?)';
        try {
            await pool.query(query, [swc_shelveCode, swc_catagoryID]);
        } catch (error) {
            console.log(`Error in inserting into shelfWithCatagory Table: ${error.message}`);
        }
    },

    getAllShelfWithCatagories: async () => {
        await getAllRows(tableName);
    },

    getShelfWithCatagoryByID: async (swc_shelveCode) => {
        await getRowByID(tableName, idHoldingColumnName, swc_shelveCode);
    },

    deleteShelfWithCatagory: async (swc_shelveCode, swc_catagoryID) => {
        const query = 'DELETE FROM shelfWithCatagory WHERE swc_shelveCode = ? AND swc_catagoryID = ?';
        try {
            await pool.query(query, [swc_shelveCode, swc_catagoryID]);
        } catch (error) {
            console.log(`Error in deleting from shelfWithCatagory Table: ${error.message}`);
        }
    }
};

export default shelfWithCatagoryModel;

