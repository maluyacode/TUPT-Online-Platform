const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const userController = require('../controllers/userController')

router.post('/register', userController.registerUser);

module.exports = router