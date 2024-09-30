const express = require('express');
const { signIn } = require('../controllers/authController');
const router = express.Router();

router.post('/sign-in', signIn);

module.exports = router;
