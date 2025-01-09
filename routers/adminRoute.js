import express from 'express';

import { 
    adminPageHtml,
    branchesPageHtml,
    shelfsPageHtml,
    staffsPageHtml
} from '../controller/staticFileController.js'

const router = express.Router();

router.get('^/$|admin(.html)?', adminPageHtml)
router.get('/branches(.html)?',branchesPageHtml)
router.get('/shelfs(.html)?', shelfsPageHtml)
router.get('/staffs(.html)?',staffsPageHtml)

export default router;