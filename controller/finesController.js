import fineModel from "../model/fines.js";

export async function createFines(req, res) {
    const { amount, datePaid, fs_transactionID } = req.body;
    try {
        await fineModel.insertFine(amount, datePaid, fs_transactionID);
        res.status(201).send('Fine successfully created');
    } catch (error) {
        res.status(500).send(`Error in inserting data into Fine table | Controller: ${error.message}`);
    }
}

export async function getAllFines(req, res) {
    try {
        const result = await fineModel.getAllFines();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error in fetching all the fines | Controller: ${error.message}`);
    }
}

export async function getFinesByID(req, res) {
    const id = req.params.id;
    try {
        const result = await fineModel.getFineByID(id);
        if (!result) {
            return res.status(404).send('Fine not found');
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error in fetching the fine by ID | Controller: ${error.message}`);
    }
}

export async function updateFines(req, res) {
    const id = req.params.id;
    const { amount, datePaid, fs_transactionID } = req.body;

    const updatedAmount = amount || await fineModel.fineAmount(id);
    const updatedDatePaid = datePaid || await fineModel.fineDatePaid(id);
    const updatedFsTransactionID = fs_transactionID || await fineModel.fineTransactionID(id);

    try {
        await fineModel.updateFine(id, updatedAmount, updatedDatePaid, updatedFsTransactionID);
        res.status(200).send('Fine successfully updated');
    } catch (error) {
        res.status(500).send(`Error in updating fine | Controller: ${error.message}`);
    }
}

export async function deleteFines(req, res) {
    const id = req.params.id;
    try {
        await fineModel.deleteFine(id);
        res.status(200).send('Fine successfully deleted');
    } catch (error) {
        res.status(500).send(`Error in deleting the fine by ID | Controller: ${error.message}`);
    }
}

