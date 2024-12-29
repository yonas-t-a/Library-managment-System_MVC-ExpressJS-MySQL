import express from 'express';

import {
    createAdmin,
    getAllAdmin,
    getAdminById,
    updateAdmin,
    deleteAdmin
} from '../../controller/adminController.js'

const router = express.Router();

router.route('/')
    .get(getAllAdmin)
    .post(createAdmin)
    
router.route('/:id')
    .get(getAdminById)
    .put(updateAdmin)
    .delete(deleteAdmin)
 

export default router;
