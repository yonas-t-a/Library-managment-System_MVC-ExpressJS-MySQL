import express from 'express';

import { 
    createCatagories, 
    getAllCatagories,
    getCatagoriesById,
    updateCatagories,
    deleteCatagories 
} from '../../controller/catagoriesController.js';

const router = express.Router();

router.route('/')
    .get(getAllCatagories)
    .post(createCatagories)
    
router.route('/:id')
    .get(getCatagoriesById)
    .put(updateCatagories)
    .delete(deleteCatagories)
 

export default router;