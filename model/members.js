import { pool } from "../database.js";
import IdGenerator from "./reusableFunctions/functionToCreateID.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import deleteRowByID from "./reusableFunctions/delateRowByID.js";
import selectSpecificAttributesCell from "./reusableFunctions/selectSpecificCell.js";

const tableName = 'member';
const idHoldingColumnName = 'memberID';

const memberModel = {
    memberName: async (id) => {
        const result = await selectSpecificAttributesCell("name", tableName, idHoldingColumnName, id);
        return result;
    },

    memberAddress: async (id) => {
        const result = await selectSpecificAttributesCell("address", tableName, idHoldingColumnName, id);
        return result;
    },

    memberPhoneNumber: async (id) => {
        const result = await selectSpecificAttributesCell("phone_number", tableName, idHoldingColumnName, id);
        return result;
    },

    memberEmail: async (id) => {
        const result = await selectSpecificAttributesCell("email", tableName, idHoldingColumnName, id);
        return result;
    },

    memberDateOfMembership: async (id) => {
        const result = await selectSpecificAttributesCell("date_of_membership", tableName, idHoldingColumnName, id);
        return result;
    },

    memberStatus: async (id) => {
        const result = await selectSpecificAttributesCell("memberhip_status", tableName, idHoldingColumnName, id);
        return result;
    },

    insertMember: async (name, address, phone_number, email, date_of_membership, memberhip_status) => {
        const memberID = await IdGenerator("memberID", "member", "member");
        const query = 'INSERT INTO member (memberID, name, address, phone_number, email, date_of_membership, memberhip_status) VALUES (?,?,?,?,?,?,?)';
        try {
            await pool.query(query, [memberID, name, address, phone_number, email, date_of_membership, memberhip_status]);
        } catch (error) {
            console.log(`Error in inserting into Member Table: ${error.message}`);
        }
    },

    getAllMembers: async () => {
        const result = await getAllRows(tableName);
        return result;
    },

    getMemberByID: async (id) => {
        const result = await getRowByID(tableName, idHoldingColumnName, id);
        return result;
    },

    updateMember: async (id, name, address, phone_number, email, date_of_membership, memberhip_status) => {
        const query = 'UPDATE member SET name=?, address=?, phone_number=?, email=?, date_of_membership=?, memberhip_status=? WHERE memberID=?';
        try {
            await pool.query(query, [name, address, phone_number, email, date_of_membership, memberhip_status, id]);
        } catch (error) {
            console.log('Error in Updating Member:', error.message);
        }
    },

    deleteMember: async (id) => {
        const result = await deleteRowByID(tableName, idHoldingColumnName, id);
        return result;
    }
};

export default memberModel;

