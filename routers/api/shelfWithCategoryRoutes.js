import express from 'express'

import {
    createShelfWithCatagory,
    getAllShelfWithCatagorys,

    getShelfWithCatagoryByshelfId,
    UpdateShelfWithCatagoryByshelfId,
    deleteShelfWithCatagoryByshelfId,

    getShelfWithCatagoryByCatagoryId,
    UpdateShelfWithCatagoryByCatagoryId,
    deleteShelfWithCatagoryByCatagoryId
} from '../../controller/shelfWithCategoryControllers.js'

const router = express.Router();

router.route('/')
    .get(getAllShelfWithCatagorys)
    .post(createShelfWithCatagory)
router.route('/shelf/:id')
    .get(getShelfWithCatagoryByshelfId)
    .put(UpdateShelfWithCatagoryByshelfId)
    .delete(deleteShelfWithCatagoryByshelfId)
router.route('/catagory/:id')
    .get(getShelfWithCatagoryByCatagoryId)
    .put(UpdateShelfWithCatagoryByCatagoryId)
    .delete(deleteShelfWithCatagoryByCatagoryId)

export default router;