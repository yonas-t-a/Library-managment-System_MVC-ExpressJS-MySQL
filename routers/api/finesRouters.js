import express from 'express';

import { 
    createFines,
    getAllFines,
    getFinesByID,
    updateFines,
    deleteFines
} from '../../controller/finesController.js';

const router = express.Router();

router.route('/')
    .get(getAllFines)
    .post(createFines)
    
router.route('/:id')
    .get(getFinesByID)
    .put(updateFines)
    .delete(deleteFines)
 

export default router;