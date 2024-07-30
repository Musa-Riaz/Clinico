const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {getDoctorInfoController, updateDoctorInfoController} = require('../controllers/doctorController');
const router = express.Router();

router
.post('/getDoctorInfo', authMiddleware, getDoctorInfoController);

router
.post('/updateDoctorInfo', authMiddleware, updateDoctorInfoController);

module.exports = router;