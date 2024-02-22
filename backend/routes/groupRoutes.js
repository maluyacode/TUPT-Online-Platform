const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const groupController = require('../controllers/groupController');
const { isAuthenticated } = require('../middlewares/Auth');

router.post('/get-users-to-be-added', isAuthenticated, groupController.getUsersTobeAdded)
router.post('/create', isAuthenticated, upload.single('coverPhoto'), groupController.createGroup)
router.get('/get-all', isAuthenticated, groupController.getGroups)
router.get('/get-single/:id', isAuthenticated, groupController.getSingleGroup)
router.put('/update/:id', isAuthenticated, upload.single('coverPhoto'), groupController.updateGroup)

module.exports = router