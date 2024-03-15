const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const videoTutorialController = require('../controllers/videoTutorialController');
const { isAuthenticated, isAuthorized } = require('../middlewares/Auth');

router.post('/create', isAuthenticated, upload.single('video'), isAuthorized('admin'), videoTutorialController.create)

router.put('/update/:id', isAuthenticated, upload.single('video'), isAuthorized('admin'), videoTutorialController.update)

router.get('/get-all', isAuthenticated, videoTutorialController.getAll)

router.get('/get-single/:id', isAuthenticated, videoTutorialController.getSingle)

router.delete('/delete/:id', isAuthenticated, isAuthorized('admin'), videoTutorialController.delete)

router.put('/disable/:id', isAuthenticated, isAuthorized('admin'), videoTutorialController.disable)

module.exports = router