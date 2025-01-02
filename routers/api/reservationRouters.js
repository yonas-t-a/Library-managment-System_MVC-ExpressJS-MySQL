import express from 'express';

import {
    createReservation,
    getAllReservation,
    getReservationById,
    updateReservation,
    deleteReservation
} from '../../controller/reservationController.js'


const router = express.Router();

router.route('/')
    .get(getAllReservation)
    .post(createReservation)
    
router.route('/:id')
    .get(getReservationById)
    .put(updateReservation)
    .delete(deleteReservation)
 

export default router;