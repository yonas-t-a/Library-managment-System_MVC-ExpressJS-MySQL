import express from 'express';

import {
    createBook,
    getAllBook,
    getBookById,
    updateBook,
    deleteBook
} from '../../controller/bookController.js'

const router = express.Router();

router.route('/')
    .get(getAllBook)
    .post(createBook)
    
router.route('/:id')
    .get(getBookById)
    .put(updateBook)
    .delete(deleteBook)
 

export default router;