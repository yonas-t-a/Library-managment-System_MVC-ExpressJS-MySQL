import shelfWithCatagoryModel from "../model/shelfWithCategory.js";

export async function createShelfWithCatagory(req, res) {
    const {swc_shelveCode, swc_catagoryID} = req.body;
    try {
        await shelfWithCatagoryModel.insertShelfWithCatagory(swc_shelveCode, swc_catagoryID);
        res.status(201).send("The shelfWithCatagory has sucessfully inserted")
    } catch (error) {
        res.status(500).send("Error in inserting  shelfWithCatagory data to the table")
    }
}
export async function getAllShelfWithCatagorys(req, res) {
    try {
        const result = await shelfWithCatagoryModel.getAllShelfWithCatagories();
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send('Error in getting all the ShelfWithCatagorys(')
    }
}

export async function getShelfWithCatagoryByshelfId(req, res) {
    const id = req.params.id;
    try {
        const result = await shelfWithCatagoryModel.getShelfWithCatagoryByShelfID(id);
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(`Error while getting the row shelfId: ${error.message}`)
    }
}
export async function UpdateShelfWithCatagoryByshelfId(req, res) {
    const id = req.params.id
    const {swc_catagoryID} = req.body;

    const updatedSwcCatagoryID = swc_catagoryID || shelfWithCatagoryModel.swcCatagoryID(id)


    try {
        await shelfWithCatagoryModel.updateShelfWithCatagoryByShelveCode(updatedSwcCatagoryID, id);
        res.status(200).send("It was sucessfully updated, swc_catagoryID by using swc_shelveCode")
    } catch (error) {
        res.status(500).send(`Error in updating swc_catagoryID by using swc_shelveCode`)
    }

}
export async function deleteShelfWithCatagoryByshelfId(req, res) {
    const id = req.params.id;
    try {
        await shelfWithCatagoryModel.deleteShelfWithCatagoryByShelveCode(id);
        res.status(200).send(`Deleting is successfull, with ShelveCode`)
    } catch (error) {
        res.status(500).send(`Error in deleteing the row with ShelveCode : ${error.message}`)
    }
}

export async function getShelfWithCatagoryByCatagoryId(req, res) {
    const id = req.params.id;
    try {
        const result = await shelfWithCatagoryModel.getShelfWithCatagoryByCatagoryID(id);
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(`Error while getting the row: ${error.message}`)
    }
}

export async function UpdateShelfWithCatagoryByCatagoryId(req, res) {
    const id = req.params.id
    const {swc_shelveCode} = req.body;

    const updatedSwcShelveCode = swc_shelveCode || shelfWithCatagoryModel.swcShelveCode(id);


    try {
        await shelfWithCatagoryModel.updateShelfWithCatagoryBycatagoryID(updatedSwcShelveCode, id);
        res.status(200).send('It was sucessfully updated, swc_shelveCode by using swc_catagoryID')
    } catch (error) {
        res.status(500).send(`Error in updating swc_shelveCode by using swc_catagoryID `)
    }
}
export async function deleteShelfWithCatagoryByCatagoryId(req, res) {
    const id = req.params.id;
    try {
        await shelfWithCatagoryModel.deleteShelfWithCatagoryBycatagoryID(id);
        res.status(200).send(`Deleting is successfull, with catagoryId`)
    } catch (error) {
        res.status(500).send(`Error in deleteing the row with catagoryID : ${error.message}`)
    }
}