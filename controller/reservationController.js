import reservationModel from "../model/reservation.js";

export async function createReservation(req, res) {
    const { reservationDate, status, res_bookID, res_memberID } = req.body;
    try {
        await reservationModel.insertReservation(reservationDate, status, res_bookID, res_memberID);
        res.status(201).send('Reservation successfully created');
    } catch (error) {
        res.status(500).send(`Error in inserting data into Reservation table | Controller: ${error.message}`);
    }
}

export async function getAllReservation(req, res) {
    try {
        const result = await reservationModel.getAllReservations();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error in fetching all reservations | Controller: ${error.message}`);
    }
}

export async function getReservationById(req, res) {
    const id = req.params.id;
    try {
        const result = await reservationModel.getReservationByID(id);
        if (!result) {
            return res.status(404).send('Reservation not found');
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error in fetching the reservation by ID | Controller: ${error.message}`);
    }
}

export async function updateReservation(req, res) {
    const id = req.params.id;
    const { reservationDate, status, res_bookID, res_memberID } = req.body;

    const updatedReservationDate = reservationDate || await reservationModel.reservationDate(id);
    const updatedStatus = status || await reservationModel.status(id);
    const updatedResBookID = res_bookID || await reservationModel.resBookID(id);
    const updatedResMemberID = res_memberID || await reservationModel.resMemberID(id);

    try {
        await reservationModel.updateReservation(id, updatedReservationDate, updatedStatus, updatedResBookID, updatedResMemberID);
        res.status(200).send('Reservation successfully updated');
    } catch (error) {
        res.status(500).send(`Error in updating reservation | Controller: ${error.message}`);
    }
}

export async function deleteReservation(req, res) {
    const id = req.params.id;
    try {
        await reservationModel.deleteReservation(id);
        res.status(200).send('Reservation successfully deleted');
    } catch (error) {
        res.status(500).send(`Error in deleting the reservation by ID | Controller: ${error.message}`);
    }
}
