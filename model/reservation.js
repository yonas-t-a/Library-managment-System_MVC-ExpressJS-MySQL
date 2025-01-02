import { pool } from "../database.js";
import IdGenerator from "./reusableFunctions/functionToCreateID.js";
import getAllRows from "./reusableFunctions/getAlldataOfTable.js";
import getRowByID from "./reusableFunctions/getRowBYID.js";
import deleteRowByID from "./reusableFunctions/delateRowByID.js";

const tableName = 'reservation';
const idHoldingColumnName = 'reservationID';

const reservationModel = {
    insertReservation: async (reservationDate, status, res_bookID, res_memberID) => {
        const reservationID = IdGenerator("reservationID", "reservation", "reservation");
        const query = 'INSERT INTO reservation (reservationID, reservationDate, status, res_bookID, res_memberID) VALUES (?,?,?,?,?)';
        try {
            await pool.query(query, [reservationID, reservationDate, status, res_bookID, res_memberID]);
        } catch (error) {
            console.log(`Error In inserting into Reservation Table: ${error.message}`);
        }
    },

    getAllReservations: async () => {
        await getAllRows(tableName);
    },

    getReservationByID: async (id) => {
        await getRowByID(tableName, idHoldingColumnName, id);
    },

    updateReservation: async (id, reservationDate, status, res_bookID, res_memberID) => {
        const query = 'UPDATE reservation SET reservationDate=?, status=?, res_bookID=?, res_memberID=? WHERE reservationID=?';
        try {
            await pool.query(query, [reservationDate, status, res_bookID, res_memberID, id]);
        } catch (error) {
            console.log('Error in Updating Reservation');
        }
    },

    deleteReservation: async (id) => {
        await deleteRowByID(tableName, idHoldingColumnName, id);
    }
};

export default reservationModel;
