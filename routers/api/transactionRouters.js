import express from 'express';

import {
    createTransaction,
    getAllTransaction,
    getTransactionById,
    updateTransaction,
    delateTransaction
} from '../../controller/transactionController.js'

const router = express.Router();

router.route('/')
    .get(getAllTransaction)
    .post(createTransaction)
    
router.route('/:id')
    .get(getTransactionById)
    .put(updateTransaction)
    .delete(delateTransaction)
 

export default router;