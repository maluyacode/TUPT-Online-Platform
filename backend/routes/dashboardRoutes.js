const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const dashboardController = require('../controllers/dashboardController');
const { isAuthenticated } = require('../middlewares/Auth');


router.get('/total-users', isAuthenticated, dashboardController.totalUsers)

module.exports = router