const express = require('express');
const router = express.Router();
const {registerUserController, loginUserController} = require('../controllers/userController');


router
.post('/login', loginUserController);


router
.post('/register', registerUserController);

module.exports = router;