import { pool } from "../database.js";
import IdGenerator from "./reusableFunctions/functionToCreateID.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import deleteRowByID from "./reusableFunctions/delateRowByID.js";

const tableName = 'shelves';
const idHoldingColumnName = 'shelveCode';  // shelveCode + branchID uniquely identifies a shelf

const shelvesModel = {
    insertShelf: async (shelveDescription, capacity, sh_adminID, sh_brancheID) => {
        const shelveCode = IdGenerator("shelveCode", "shelves", "shelve");
        const query = 'INSERT INTO shelves (shelveCode, shelveDescription, capacity, sh_adminID, sh_brancheID) VALUES (?,?,?,?,?)';
        try {
            await pool.query(query, [shelveCode, shelveDescription, capacity, sh_adminID, sh_brancheID]);
        } catch (error) {
            console.log(`Error In inserting into Shelves Table: ${error.message}`);
        }
    },

    getAllShelves: async () => {
        await getAllRows(tableName);
    },

    getShelfByID: async (shelveCode, sh_brancheID) => {
        await getRowByID(tableName, idHoldingColumnName, { shelveCode, sh_brancheID });
    },

    updateShelf: async (shelveCode, sh_brancheID, shelveDescription, capacity, sh_adminID) => {
        const query = 'UPDATE shelves SET shelveDescription=?, capacity=?, sh_adminID=? WHERE shelveCode=? AND sh_brancheID=?';
        try {
            await pool.query(query, [shelveDescription, capacity, sh_adminID, shelveCode, sh_brancheID]);
        } catch (error) {
            console.log('Error in Updating Shelf');
        }
    },

    deleteShelf: async (shelveCode, sh_brancheID) => {
        await deleteRowByID(tableName, idHoldingColumnName, { shelveCode, sh_brancheID });
    }
};

export default shelvesModel;
