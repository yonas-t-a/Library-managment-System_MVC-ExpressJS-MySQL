import staffModel from "../model/staff.js";

export async function createStaff(req, res) {
    const { name, role, phone_number, email, hire_Date, salary, st_brancheID, st_adminID } = req.body;
    try {
        await staffModel.insertStaff(name, role, phone_number, email, hire_Date, salary, st_brancheID, st_adminID);
        res.status(201).send('Staff successfully created');
    } catch (error) {
        res.status(500).send(`Error in inserting data into Staff table | Controller: ${error.message}`);
    }
}

export async function getAllStaff(req, res) {
    try {
        const result = await staffModel.getAllStaff();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error in fetching all staff | Controller: ${error.message}`);
    }
}

export async function getStaffById(req, res) {
    const { staffID } = req.params;
    try {
        const result = await staffModel.getStaffByID(staffID);
        if (!result) {
            return res.status(404).send('Staff not found');
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error in fetching the staff by ID | Controller: ${error.message}`);
    }
}

export async function updateStaff(req, res) {
    const { staffID } = req.params;
    const { name, role, phone_number, email, hire_Date, salary, st_brancheID, st_adminID } = req.body;

    const updatedName = name || await staffModel.staffName(staffID);
    const updatedRole = role || await staffModel.staffRole(staffID);
    const updatedPhoneNumber = phone_number || await staffModel.staffPhoneNumber(staffID);
    const updatedEmail = email || await staffModel.staffEmail(staffID);
    const updatedHireDate = hire_Date || await staffModel.staffHireDate(staffID);
    const updatedSalary = salary || await staffModel.staffSalary(staffID);
    const updatedStBranchID = st_brancheID || await staffModel.staffBranchID(staffID);
    const updatedStAdminID = st_adminID || await staffModel.staffAdminID(staffID);

    try {
        await staffModel.updateStaff(staffID, updatedName, updatedRole, updatedPhoneNumber, updatedEmail, updatedHireDate, updatedSalary, updatedStBranchID, updatedStAdminID);
        res.status(200).send('Staff successfully updated');
    } catch (error) {
        res.status(500).send(`Error in updating staff | Controller: ${error.message}`);
    }
}

export async function deleteStaff(req, res) {
    const { staffID } = req.params;
    try {
        await staffModel.deleteStaff(staffID);
        res.status(200).send('Staff successfully deleted');
    } catch (error) {
        res.status(500).send(`Error in deleting the staff by ID | Controller: ${error.message}`);
    }
}
