import categoryModel from "../model/catagories.js";

export async function createCatagories (req, res) {
    const { catagoryName, description } = req.body;
    try {
        await categoryModel.insertCategory(catagoryName, description);
        res.status(201).send('Category successfully created');
    } catch (error) {
        res.status(500).send(`Error in inserting data into Category table | Controller: ${error.message}`);
    }
}

export async function getAllCatagories (req, res) {
    try {
        const result = await categoryModel.getAllCategories();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error in fetching all the categories | Controller: ${error.message}`);
    }
}

export async function getCatagoriesById (req, res) {
    const id = req.params.id;
    try {
        const result = await categoryModel.getCategoryByID(id);
        if (!result) {
            return res.status(404).send('Category not found');
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(`Error in fetching the category by ID | Controller: ${error.message}`);
    }
}

export async function updateCatagories (req, res) {
    const id = req.params.id;
    const { catagoryName, description } = req.body;

    const updatedCategoryName = catagoryName || await categoryModel.categoryName(id);
    const updatedDescription = description || await categoryModel.categoryDescription(id);

    try {
        await categoryModel.updateCategory(id, updatedCategoryName, updatedDescription);
        res.status(200).send('Category successfully updated');
    } catch (error) {
        res.status(500).send(`Error in updating category | Controller: ${error.message}`);
    }
}

export async function deleteCatagories (req, res) {
    const id = req.params.id;
    try {
        await categoryModel.deleteCategory(id);
        res.status(200).send('Category successfully deleted');
    } catch (error) {
        res.status(500).send(`Error in deleting the category by ID | Controller: ${error.message}`);
    }
}
