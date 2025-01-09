import express from 'express';

import { 
    booksPageHtml,
    finesPageHtml,
    membersPageHtml,
    nonMembersPageHtml,
    reservationPageHtml,
    transactionPageHtml,
    
    shelfWithCatagoryPageHtml,
    catagoryPageHtml,
    indexPageHtml,
 } from '../controller/staticFileController.js';

const router = express.Router();

router.get('^/$|index(.html)?', indexPageHtml);


router.get('/books(.html)?', booksPageHtml)
router.get('/fines(.html)?', finesPageHtml)
router.get('/members(.html)?', membersPageHtml)
router.get('/non-members(.html)?', nonMembersPageHtml)
router.get('/reservation(.html)?', reservationPageHtml)
router.get('/transaction(.html)?', transactionPageHtml)

router.get('/shelfWithCatagory(.html)?', shelfWithCatagoryPageHtml)
router.get('/catagory(.html)?', catagoryPageHtml)


export default router;