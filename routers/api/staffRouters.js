import express from 'express';

import {
    createStaff,
    getAllStaff,
    getStaffById,
    updateStaff,
    delateStaff
} from '../../controller/staffController.js'


const router = express.Router();

router.route('/')
    .get(getAllStaff)
    .post(createStaff)
    
router.route('/:id')
    .get(getStaffById)
    .put(updateStaff)
    .delete(delateStaff)
 

export default router;