import express from 'express';

import {
    createShelves,
    getAllShelves,
    getShelvesById,
    updateShelves,
    deleteShelves
} from '../../controller/shelvesController.js'


const router = express.Router();

router.route('/')
    .get(getAllShelves)
    .post(createShelves)
    
router.route('/:id')
    .get(getShelvesById)
    .put(updateShelves)
    .delete(deleteShelves)
 

export default router;