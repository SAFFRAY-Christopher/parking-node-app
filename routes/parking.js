const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');



const  { 
    getAllParkings,
    getOneParking,
    createParking,
    updateParking,
    deleteParking 
} = require('../controllers/parking')

router.get('/',auth, getAllParkings);

router.get('/:parkingID',auth,  getOneParking)

router.post('/', auth, createParking) 

router.put('/:parkingID', auth, updateParking) 

router.delete('/:parkingID',auth,  deleteParking)

module.exports = router;