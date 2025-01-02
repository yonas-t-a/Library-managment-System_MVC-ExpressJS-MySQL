import nonMemberBorrowerModel from "../model/nonMemberBorrwer.js";

export async function createNonMember(req, res) {
    const { name, address, phone_number, IDProof_Status, status } = req.body;
    try {
        await nonMemberBorrowerModel.insertNonMemberBorrower(name, address, phone_number, IDProof_Status, status);
        res.status(201).send('Non-Member Borrower successfully created');
    } catch (error) {
        res.status(500).send(`Error in inserting data into Non-Member Borrower table | Controller: ${error.message}`);
    }
}

export async function getAllNonMember(req, res) {
    try {
        const result = await nonMemberBorrowerModel.getAllNonMembers();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error in fetching all non-member borrowers | Controller: ${error.message}`);
    }
}

export async function getNonMemberById(req, res) {
    const id = req.params.id;
    try {
        const result = await nonMemberBorrowerModel.getNonMemberByID(id);
        if (!result) {
            return res.status(404).send('Non-Member Borrower not found');
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error in fetching the non-member borrower by ID | Controller: ${error.message}`);
    }
}

export async function updateNonMember(req, res) {
    const id = req.params.id;
    const { name, address, phone_number, IDProof_Status, status } = req.body;

    const updatedName = name || await nonMemberBorrowerModel.nonMemberName(id);
    const updatedAddress = address || await nonMemberBorrowerModel.nonMemberAddress(id);
    const updatedPhoneNumber = phone_number || await nonMemberBorrowerModel.nonMemberPhoneNumber(id);
    const updatedIDProofStatus = IDProof_Status || await nonMemberBorrowerModel.nonMemberIDProofStatus(id);
    const updatedStatus = status || await nonMemberBorrowerModel.nonMemberStatus(id);

    try {
        await nonMemberBorrowerModel.updateNonMember(id, updatedName, updatedAddress, updatedPhoneNumber, updatedIDProofStatus, updatedStatus);
        res.status(200).send('Non-Member Borrower successfully updated');
    } catch (error) {
        res.status(500).send(`Error in updating non-member borrower | Controller: ${error.message}`);
    }
}

export async function deleteNonMember(req, res) {
    const id = req.params.id;
    try {
        await nonMemberBorrowerModel.deleteNonMember(id);
        res.status(200).send('Non-Member Borrower successfully deleted');
    } catch (error) {
        res.status(500).send(`Error in deleting the non-member borrower by ID | Controller: ${error.message}`);
    }
}
