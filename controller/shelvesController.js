import shelvesModel from "../model/shelves.js";

export async function createShelves(req, res) {
    const { shelveDescription, capacity, sh_adminID, sh_brancheID } = req.body;
    try {
        await shelvesModel.insertShelf(shelveDescription, capacity, sh_adminID, sh_brancheID);
        res.status(201).send('Shelf successfully created');
    } catch (error) {
        res.status(500).send(`Error in inserting data into Shelves table | Controller: ${error.message}`);
    }
}

export async function getAllShelves(req, res) {
    try {
        const result = await shelvesModel.getAllShelves();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error in fetching all shelves | Controller: ${error.message}`);
    }
}

export async function getShelvesById(req, res) {
    const { shelveCode, sh_brancheID } = req.params;
    try {
        const result = await shelvesModel.getShelfByID(shelveCode, sh_brancheID);
        if (!result) {
            return res.status(404).send('Shelf not found');
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error in fetching the shelf by ID | Controller: ${error.message}`);
    }
}

export async function updateShelves(req, res) {
    const { shelveCode, sh_brancheID } = req.params;
    const { shelveDescription, capacity, sh_adminID } = req.body;

    const updatedShelveDescription = shelveDescription || await shelvesModel.shelveDescription(shelveCode, sh_brancheID);
    const updatedCapacity = capacity || await shelvesModel.shelveCapacity(shelveCode, sh_brancheID);
    const updatedShAdminID = sh_adminID || await shelvesModel.shelveAdminID(shelveCode, sh_brancheID);

    try {
        await shelvesModel.updateShelf(shelveCode, sh_brancheID, updatedShelveDescription, updatedCapacity, updatedShAdminID);
        res.status(200).send('Shelf successfully updated');
    } catch (error) {
        res.status(500).send(`Error in updating shelf | Controller: ${error.message}`);
    }
}

export async function deleteShelves(req, res) {
    const { shelveCode, sh_brancheID } = req.params;
    try {
        await shelvesModel.deleteShelf(shelveCode, sh_brancheID);
        res.status(200).send('Shelf successfully deleted');
    } catch (error) {
        res.status(500).send(`Error in deleting the shelf by ID | Controller: ${error.message}`);
    }
}
