import branchModel from "../model/branches.js";

export async function createBranch (req, res) {
    const { address, phone_number, email, br_adminID } = req.body;
    try {
        await branchModel.insertBranch(address, phone_number, email, br_adminID);
        res.status(201).send('Branch successfully created');
    } catch (error) {
        res.status(500).send(`Error in inserting data into Branch table | Controller: ${error.message}`);
    }
}

export async function getAllBranch (req, res) {
    try {
        const result = await branchModel.getAllBranches();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error in fetching all the branches | Controller: ${error.message}`);
    }
}

export async function getBranchById (req, res) {
    const id = req.params.id;
    try {
        const result = await branchModel.getBranchByID(id);
        if (!result) {
            return res.status(404).send('Branch not found');
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error in fetching the branch by ID | Controller: ${error.message}`);
    }
}

export async function updateBranch (req, res) {
    const id = req.params.id;
    const { address, phone_number, email, br_adminID } = req.body;

    const updatedAddress = address || await branchModel.branchAddress(id);
    const updatedPhoneNumber = phone_number || await branchModel.branchPhoneNumber(id);
    const updatedEmail = email || await branchModel.branchEmail(id);
    const updatedAdminID = br_adminID || await branchModel.branchAdminID(id);

    try {
        await branchModel.updateBranch(id, updatedAddress, updatedPhoneNumber, updatedEmail, updatedAdminID);
        res.status(200).send('Branch successfully updated');
    } catch (error) {
        console.log(`Error in updating Branch | Controller: ${error.message}`);
        res.status(500).send('Error in updating branch');
    }
}

export async function deleteBranch (req, res) {
    const id = req.params.id;
    try {
        await branchModel.deleteBranch(id);
        res.status(200).send('Branch successfully deleted');
    } catch (error) {
        res.status(500).send(`Error in deleting the branch by ID | Controller: ${error.message}`);
    }
}

