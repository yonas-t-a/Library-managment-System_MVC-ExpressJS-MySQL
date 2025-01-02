import { pool } from "../database.js";
import IdGenerator from "./reusableFunctions/functionToCreateID.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import deleteRowByID from "./reusableFunctions/delateRowByID.js";

const tableName = 'member';
const idHoldingColumnName = 'memberID';

const memberModel = {
    insertMember: async (name, address, phone_number, email, date_of_membership, memberhip_status) => {
        const memberID = IdGenerator("memberID", "member", "member");
        const query = 'INSERT INTO member (memberID, name, address, phone_number, email, date_of_membership, memberhip_status) VALUES (?,?,?,?,?,?,?)';
        try {
            await pool.query(query, [memberID, name, address, phone_number, email, date_of_membership, memberhip_status]);
        } catch (error) {
            console.log(`Error In inserting into Member Table: ${error.message}`);
        }
    },

    getAllMembers: async () => {
        await getAllRows(tableName);
    },

    getMemberByID: async (id) => {
        await getRowByID(tableName, idHoldingColumnName, id);
    },

    updateMember: async (id, name, address, phone_number, email, date_of_membership, memberhip_status) => {
        const query = 'UPDATE member SET name=?, address=?, phone_number=?, email=?, date_of_membership=?, memberhip_status=? WHERE memberID=?';
        try {
            await pool.query(query, [name, address, phone_number, email, date_of_membership, memberhip_status, id]);
        } catch (error) {
            console.log('Error in Updating Member');
        }
    },

    deleteMember: async (id) => {
        await deleteRowByID(tableName, idHoldingColumnName, id);
    }
};

export default memberModel;
