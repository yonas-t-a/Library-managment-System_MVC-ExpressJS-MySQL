import { pool } from "../database.js";
import IdGenerator from "./reusableFunctions/functionToCreateID.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import deleteRowByID from "./reusableFunctions/delateRowByID.js";
import selectSpecificAttributesCell from "./reusableFunctions/selectSpecificCell.js";

const tableName = 'reservation';
const idHoldingColumnName = 'reservationID';

const reservationModel = {
    reservationDate: async (id) => {
        const result = await selectSpecificAttributesCell("reservationDate", tableName, idHoldingColumnName, id);
        return result;
    },

    status: async (id) => {
        const result = await selectSpecificAttributesCell("status", tableName, idHoldingColumnName, id);
        return result;
    },

    resBookID: async (id) => {
        const result = await selectSpecificAttributesCell("res_bookID", tableName, idHoldingColumnName, id);
        return result;
    },

    resMemberID: async (id) => {
        const result = await selectSpecificAttributesCell("res_memberID", tableName, idHoldingColumnName, id);
        return result;
    },

    insertReservation: async (reservationDate, status, res_bookID, res_memberID) => {
        const reservationID = IdGenerator("reservationID", "reservation", "reservation");
        const query = 'INSERT INTO reservation (reservationID, reservationDate, status, res_bookID, res_memberID) VALUES (?,?,?,?,?)';
        try {
            await pool.query(query, [reservationID, reservationDate, status, res_bookID, res_memberID]);
        } catch (error) {
            console.log(`Error in inserting into Reservation Table: ${error.message}`);
        }
    },

    getAllReservations: async () => {
        const result = await getAllRows(tableName);
        return result;
    },

    getReservationByID: async (id) => {
        const result = await getRowByID(tableName, idHoldingColumnName, id);
        return result;
    },

    updateReservation: async (id, reservationDate, status, res_bookID, res_memberID) => {
        const query = 'UPDATE reservation SET reservationDate=?, status=?, res_bookID=?, res_memberID=? WHERE reservationID=?';
        try {
            await pool.query(query, [reservationDate, status, res_bookID, res_memberID, id]);
        } catch (error) {
            console.log('Error in Updating Reservation:', error.message);
        }
    },

    deleteReservation: async (id) => {
        const result = await deleteRowByID(tableName, idHoldingColumnName, id);
        return result;
    }
};

export default reservationModel;

