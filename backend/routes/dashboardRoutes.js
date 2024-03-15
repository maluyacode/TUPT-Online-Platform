const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const dashboardController = require('../controllers/dashboardController');
const { isAuthenticated, isAuthorized } = require('../middlewares/Auth');


router.get('/total-users', isAuthenticated, isAuthorized('admin'), dashboardController.totalUsers)
router.get('/total-announcements', isAuthenticated, isAuthorized('admin'), dashboardController.totalAnnouncements)
router.get('/total-messages', isAuthenticated, isAuthorized('admin'), dashboardController.totalMessages)
router.get('/total-topics', isAuthenticated, isAuthorized('admin'), dashboardController.totalTopics)



module.exports = router