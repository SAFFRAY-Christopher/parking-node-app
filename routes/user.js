const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const  { 
    getAllUsers,
    getOneUser,
    signUp,
    updateUser,
    deleteUser,
    login 
} = require('../controllers/User')

router.post('/signup', signUp) 

router.post('/login',login )

router.get('/',auth,  getAllUsers);

router.get('/:UserID',auth,  getOneUser)

router.put('/:UserID',auth,  updateUser) 

router.delete('/:UserID',auth,  deleteUser)


module.exports = router;