const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');



const  { 
    getAllReservations,
    getOneReservation,
    createReservation,
    updateReservation,
    deleteReservation 
} = require('../controllers/reservation')

router.get('/',auth,  getAllReservations)

router.get('/:reservationID',auth,  getOneReservation)

router.post('/',auth,  createReservation) 

router.put('/:reservationID',auth,  updateReservation) 

router.delete('/:reservationID',auth,  deleteReservation)

module.exports = router;