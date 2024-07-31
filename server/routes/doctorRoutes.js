const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {getDoctorInfoController, updateDoctorInfoController, getDoctorListController, getDoctorByIdController} = require('../controllers/doctorController');
const router = express.Router();

router
.post('/getDoctorInfo', authMiddleware, getDoctorInfoController);

router
.post('/updateDoctorInfo', authMiddleware, updateDoctorInfoController);

router
.get('/getDoctorList', authMiddleware, getDoctorListController);

router
.get('/getDoctorById/:id', authMiddleware, getDoctorByIdController)

module.exports = router;