import express from 'express';

import {
    createStaff,
    getAllStaff,
    getStaffById,
    updateStaff,
    deleteStaff
} from '../../controller/staffController.js'


const router = express.Router();

router.route('/')
    .get(getAllStaff)
    .post(createStaff)
    
router.route('/:id')
    .get(getStaffById)
    .put(updateStaff)
    .delete(deleteStaff)
 

export default router;