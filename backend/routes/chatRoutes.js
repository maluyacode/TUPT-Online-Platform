const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const chatController = require('../controllers/chatController');
const { isAuthenticated } = require('../middlewares/Auth');

router.post('/', isAuthenticated, chatController.accessPrivateChat)

module.exports = router