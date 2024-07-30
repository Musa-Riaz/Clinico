const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {registerUserController, loginUserController, authController, applyDoctorController, getAllNotificationsController, deleteAllNotificationsController} = require('../controllers/userController');


router
.post('/login', loginUserController);


router
.post('/register', registerUserController);

router
.post('/getUserData', authMiddleware, authController);


router
.post('/apply-doctor', authMiddleware, applyDoctorController);


router
.post('/get-all-notifications', authMiddleware, getAllNotificationsController);

router
.post('/delete-all-notifications', authMiddleware, deleteAllNotificationsController);

module.exports = router;