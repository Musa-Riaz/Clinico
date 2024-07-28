const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {registerUserController, loginUserController, authController} = require('../controllers/userController');


router
.post('/login', loginUserController);


router
.post('/register', registerUserController);

router
.post('/getUserData', authMiddleware, authController);

module.exports = router;