const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const collabController = require('../controllers/collabController');
const { isAuthenticated } = require('../middlewares/Auth');

router.post('/create/post', isAuthenticated, upload.fields([
    { name: 'attachments', maxCount: 3 },
    { name: 'images', maxCount: 3 },
]), collabController.createPost);

router.get('/get-all', isAuthenticated, collabController.getAllTopics)

router.get('/get-single/:id', isAuthenticated, collabController.getSingleTopic)

module.exports = router