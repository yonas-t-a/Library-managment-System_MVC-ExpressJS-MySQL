import express from 'express';

import {
    createNonMember,
    getAllNonMember,
    getNonMemberById,
    updateNonMember,
    delateNonMember
} from '../../controller/nonMemberBorrwerController.js'


const router = express.Router();

router.route('/')
    .get(getAllNonMember)
    .post(createNonMember)
    
router.route('/:id')
    .get(getNonMemberById)
    .put(updateNonMember)
    .delete(delateNonMember)
 

export default router;