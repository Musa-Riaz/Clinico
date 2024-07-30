const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {getAllUsersController, getAllDoctorsController, changeAccountStatusController} = require('../controllers/adminController');
const router = express.Router();

router
.get('/get-all-users', authMiddleware, getAllUsersController);

router
.get("/get-all-doctors", authMiddleware, getAllDoctorsController);

router
.post("/changeAccountStatus", authMiddleware, changeAccountStatusController);

module.exports = router;