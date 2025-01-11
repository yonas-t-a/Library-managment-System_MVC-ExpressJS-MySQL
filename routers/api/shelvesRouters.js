import express from "express";
import {
    createShelves,
    getAllShelves,
    getShelvesById,
    updateShelves,
    deleteShelves,
} from "../../controller/shelvesController.js";

const router = express.Router();

// Routes for shelves
router.route("/")
    .get(getAllShelves)    // GET all shelves
    .post(createShelves);  // CREATE a new shelf

router.route("/:id")
    .get(getShelvesById)   // GET a shelf by ID
    .put(updateShelves)    // UPDATE a shelf by ID
    .delete(deleteShelves); // DELETE a shelf by ID

export default router;

