import { pool } from "../database.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import selectSpecificAttributesCell from "./reusableFunctions/selectSpecificCell.js";



const tableName = 'shelfWithCatagory';

const shelfWithCatagoryModel = {
    swcShelveCode: async (swcCatagoryID) => {
        const result = await selectSpecificAttributesCell("swc_shelveCode",tableName, " swc_catagoryID", swcCatagoryID)
        return result;
    },
    swcCatagoryID: async (swcShelveCode) => {
        const result = await selectSpecificAttributesCell("swc_catagoryID" ,tableName,"swc_shelveCode", swcShelveCode)
        return result;
    },
    insertShelfWithCatagory: async (swc_shelveCode, swc_catagoryID) => {
        const query = 'INSERT INTO shelfWithCatagory (swc_shelveCode, swc_catagoryID) VALUES (?, ?)';
        try {
            await pool.query(query, [swc_shelveCode, swc_catagoryID]);
        } catch (error) {
            console.log(`Error in inserting into shelfWithCatagory Table: ${error.message}`);
        }
    },

    getAllShelfWithCatagories: async () => {
        const [result] = await getAllRows(tableName);
        return result
    },
    getShelfWithCatagoryByShelfID: async (swc_shelveCode) => {
        const [result] = await getRowByID(tableName, "swc_shelveCode", swc_shelveCode);
        return result
    },
    getShelfWithCatagoryByCatagoryID: async (swc_catagoryID) => {
        const [result] = await getRowByID(tableName, "swc_catagoryID", swc_catagoryID)
        return result
    },
    deleteShelfWithCatagoryByShelveCode: async (swc_shelveCode) => {
        const query = 'DELETE FROM shelfWithCatagory WHERE swc_shelveCode = ?';
        try {
            await pool.query(query, [swc_shelveCode]);
        } catch (error) {
            console.log(`Error in deleting from shelfWithCatagory Table: ${error.message}`);
            throw error
        }
    },
    deleteShelfWithCatagoryBycatagoryID: async (swc_catagoryID) => {
        const query = 'DELETE FROM shelfWithCatagory WHERE swc_catagoryID = ?';
        try {
            await pool.query(query, [swc_catagoryID]);
        } catch (error) {
            console.log(`Error in deleting from shelfWithCatagory Table: ${error.message}`);
            throw error
        }
    }, 
    updateShelfWithCatagoryByShelveCode: async (swc_catagoryID,swc_shelveCode) => {
        const query = 'UPDATE shelfWithCatagory SET swc_catagoryID = ? WHERE swc_shelveCode= ?'
        try {
            await pool.query(query,[swc_catagoryID, swc_shelveCode])
        } catch (error) {
            console.log(`Error in updating swc_catagoryID by using swc_shelveCode`)
            throw error
        }
    },
    updateShelfWithCatagoryBycatagoryID: async (swc_shelveCode, swc_catagoryID) => {
        const query = 'UPDATE shelfWithCatagory SET swc_shelveCode= ? WHERE swc_catagoryID = ? '
        try {
            await pool.query(query,[ swc_shelveCode, swc_catagoryID])
        } catch (error) {
            console.log(`Error in updating swc_shelveCode by using swc_catagoryID`)
            throw error
        }
    }, 

};

export default shelfWithCatagoryModel;

