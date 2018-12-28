const express = require('express');
const registerController = require('../controllers/register');
const validator = require('../controllers/validator');

const router = express.Router();

router.post('/', validator.register, registerController.register);

module.exports = router;
