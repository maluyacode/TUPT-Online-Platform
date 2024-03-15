const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const chatController = require('../controllers/chatController');
const { isAuthenticated, isAuthorized } = require('../middlewares/Auth');

router.post('/', isAuthenticated, chatController.accessPrivateChat)

router.get('/lists', isAuthenticated, chatController.getUserChats)

router.get('/all', isAuthenticated, isAuthorized('admin'), chatController.geAllChats);

router.get('/conversation/:id', isAuthenticated, chatController.getConversation);

module.exports = router