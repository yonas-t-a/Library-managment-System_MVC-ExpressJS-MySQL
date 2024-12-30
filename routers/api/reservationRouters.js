import express from 'express';

import {
    createReservation,
    getAllReservation,
    getReservationById,
    updateReservation,
    delateReservation
} from '../../controller/reservationController.js'


const router = express.Router();

router.route('/')
    .get(getAllReservation)
    .post(createReservation)
    
router.route('/:id')
    .get(getReservationById)
    .put(updateReservation)
    .delete(delateReservation)
 

export default router;