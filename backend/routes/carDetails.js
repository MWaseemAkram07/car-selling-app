const express = require('express');
const { addCarDetails } = require('../controllers/carDetailsController');
const auth = require('../middleware/auth');
const { uploadMiddleware } = require('../middleware/uploadMiddleware');
const router = express.Router();

router.post('/car-details', auth, uploadMiddleware, addCarDetails);

module.exports = router;
