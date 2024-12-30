import express from 'express';

import {
    createBranch,
    getAllBranch,
    getBranchById,
    updateBranch,
    deleteBranch
} from '../../controller/branchesController.js';

const router = express.Router();

router.route('/')
    .get(getAllBranch)
    .post(createBranch)
    
router.route('/:id')
    .get(getBranchById)
    .put(updateBranch)
    .delete(deleteBranch)
 

export default router;