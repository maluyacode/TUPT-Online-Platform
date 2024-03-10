const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const messageController = require('../controllers/messageController');
const { isAuthenticated } = require('../middlewares/Auth');

router.post('/send', isAuthenticated, messageController.sendMessage)

router.post('/notify-user', isAuthenticated, messageController.notifyUser);

router.put('/hide/:id', isAuthenticated, messageController.hideMessage);

module.exports = router