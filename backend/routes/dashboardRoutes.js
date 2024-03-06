const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const dashboardController = require('../controllers/dashboardController');
const { isAuthenticated } = require('../middlewares/Auth');


router.get('/total-users', isAuthenticated, dashboardController.totalUsers)
router.get('/total-announcements', isAuthenticated, dashboardController.totalAnnouncements)
router.get('/total-messages', isAuthenticated, dashboardController.totalMessages)
router.get('/total-topics', isAuthenticated, dashboardController.totalTopics)



module.exports = router