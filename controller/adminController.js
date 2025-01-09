import adminModel from "../model/admin.js";

export async function createAdmin   (req, res) {
    const {name, phone_number, email, password} = req.body;
    try {
        await adminModel.insertAdmin(name, phone_number, email, password)
        res.status(201).send("Admin was secessFully created")
    } catch (error) {
        res.status(500).send(`Error in insering data in to Admin table | Controller: ${error.message}`)
    }
}
export async function getAllAdmin   (req, res) {
    try {
        const result = await adminModel.getAllAdmins()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(`Error in fetching all the movie | Controller: ${error.message}`)
    }
}
export async function getAdminById  (req, res) {
    const id = req.params.id;
    try {
        const [result] = await adminModel.getAdminByID(id);
        res.status(200).json(result)        
    } catch (error) {
        res.status(500).send(`Error in fetching the movie by ID | Controller: ${error.message}`)
    }
}
export async function updateAdmin   (req, res) {
    const id = req.params.id;
    const {name, phone_number, email, password} = req.body;


    const updatedName = name || await adminModel.adminName(id);
    const updatedPhoneNumber = phone_number ||await adminModel.adminPhone_number(id);
    const updatedEmail = email ||await adminModel.adminEmail(id);
    const updatedPassword = password ||await adminModel.adminPassword(id);

    try {
        await adminModel.updateAdmin(id, updatedName, updatedPhoneNumber, updatedEmail, updatedPassword);
    } catch (error) {
        console.log(`Error in updatingAdmin | Controller : ${error.message}`)
    }
}
export async function deleteAdmin   (req, res) {
    const id = req.params.id;
    try {
        await adminModel.deleteAdmin(id)
        res.status(200).send('Admin Sucessfuly deleted')
    } catch (error) {
        res.status(500).send(`Error in deleting the movie by ID | Controller: ${error.message}`)
    }
}
