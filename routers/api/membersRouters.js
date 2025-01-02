import express from 'express';

import {
    createMember,
    getAllMember,
    getMemberById,
    updateMember,
    deleteMember
} from '../../controller/membersController.js'

const router = express.Router();

router.route('/')
    .get(getAllMember)
    .post(createMember)
    
router.route('/:id')
    .get(getMemberById)
    .put(updateMember)
    .delete(deleteMember)
 

export default router;