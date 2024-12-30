import express from 'express';

import {
    createMember,
    getAllMember,
    getMemberById,
    updateMember,
    delateMember
} from '../../controller/membersController.js'

const router = express.Router();

router.route('/')
    .get(getAllMember)
    .post(createMember)
    
router.route('/:id')
    .get(getMemberById)
    .put(updateMember)
    .delete(delateMember)
 

export default router;