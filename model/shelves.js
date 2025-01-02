import { pool } from "../database.js";
import IdGenerator from "./reusableFunctions/functionToCreateID.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import deleteRowByID from "./reusableFunctions/delateRowByID.js";
import selectSpecificAttributesCell from "./reusableFunctions/selectSpecificCell.js";

const tableName = 'shelves';
const idHoldingColumnName = 'shelveCode';  // shelveCode + branchID uniquely identifies a shelf

const shelvesModel = {
    shelveDescription: async (shelveCode, sh_brancheID) => {
        const result = await selectSpecificAttributesCell("shelveDescription", tableName, idHoldingColumnName, { shelveCode, sh_brancheID });
        return result;
    },

    shelveCapacity: async (shelveCode, sh_brancheID) => {
        const result = await selectSpecificAttributesCell("capacity", tableName, idHoldingColumnName, { shelveCode, sh_brancheID });
        return result;
    },

    shelveAdminID: async (shelveCode, sh_brancheID) => {
        const result = await selectSpecificAttributesCell("sh_adminID", tableName, idHoldingColumnName, { shelveCode, sh_brancheID });
        return result;
    },

    shelveBranchID: async (shelveCode, sh_brancheID) => {
        const result = await selectSpecificAttributesCell("sh_brancheID", tableName, idHoldingColumnName, { shelveCode, sh_brancheID });
        return result;
    },

    insertShelf: async (shelveDescription, capacity, sh_adminID, sh_brancheID) => {
        const shelveCode = IdGenerator("shelveCode", "shelves", "shelve");
        const query = 'INSERT INTO shelves (shelveCode, shelveDescription, capacity, sh_adminID, sh_brancheID) VALUES (?,?,?,?,?)';
        try {
            await pool.query(query, [shelveCode, shelveDescription, capacity, sh_adminID, sh_brancheID]);
        } catch (error) {
            console.log(`Error in inserting into Shelves Table: ${error.message}`);
        }
    },

    getAllShelves: async () => {
        const result = await getAllRows(tableName);
        return result;
    },

    getShelfByID: async (shelveCode, sh_brancheID) => {
        const result = await getRowByID(tableName, idHoldingColumnName, { shelveCode, sh_brancheID });
        return result;
    },

    updateShelf: async (shelveCode, sh_brancheID, shelveDescription, capacity, sh_adminID) => {
        const query = 'UPDATE shelves SET shelveDescription=?, capacity=?, sh_adminID=? WHERE shelveCode=? AND sh_brancheID=?';
        try {
            await pool.query(query, [shelveDescription, capacity, sh_adminID, shelveCode, sh_brancheID]);
        } catch (error) {
            console.log('Error in updating Shelf: ' + error.message);
        }
    },

    deleteShelf: async (shelveCode, sh_brancheID) => {
        const result = await deleteRowByID(tableName, idHoldingColumnName, { shelveCode, sh_brancheID });
        return result;
    }
};

export default shelvesModel;
