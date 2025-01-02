import memberModel from "../model/members.js";

export async function createMember(req, res) {
    const { name, address, phone_number, email, date_of_membership, memberhip_status } = req.body;
    try {
        await memberModel.insertMember(name, address, phone_number, email, date_of_membership, memberhip_status);
        res.status(201).send('Member successfully created');
    } catch (error) {
        res.status(500).send(`Error in inserting data into Member table | Controller: ${error.message}`);
    }
}

export async function getAllMember(req, res) {
    try {
        const result = await memberModel.getAllMembers();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error in fetching all members | Controller: ${error.message}`);
    }
}

export async function getMemberById(req, res) {
    const id = req.params.id;
    try {
        const result = await memberModel.getMemberByID(id);
        if (!result) {
            return res.status(404).send('Member not found');
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error in fetching the member by ID | Controller: ${error.message}`);
    }
}

export async function updateMember(req, res) {
    const id = req.params.id;
    const { name, address, phone_number, email, date_of_membership, memberhip_status } = req.body;

    const updatedName = name || await memberModel.memberName(id);
    const updatedAddress = address || await memberModel.memberAddress(id);
    const updatedPhoneNumber = phone_number || await memberModel.memberPhoneNumber(id);
    const updatedEmail = email || await memberModel.memberEmail(id);
    const updatedDateOfMembership = date_of_membership || await memberModel.memberDateOfMembership(id);
    const updatedMemberhipStatus = memberhip_status || await memberModel.memberStatus(id);

    try {
        await memberModel.updateMember(id, updatedName, updatedAddress, updatedPhoneNumber, updatedEmail, updatedDateOfMembership, updatedMemberhipStatus);
        res.status(200).send('Member successfully updated');
    } catch (error) {
        res.status(500).send(`Error in updating member | Controller: ${error.message}`);
    }
}

export async function deleteMember(req, res) {
    const id = req.params.id;
    try {
        await memberModel.deleteMember(id);
        res.status(200).send('Member successfully deleted');
    } catch (error) {
        res.status(500).send(`Error in deleting the member by ID | Controller: ${error.message}`);
    }
}
