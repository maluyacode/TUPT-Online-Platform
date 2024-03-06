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

router.put('/update-post/:id', isAuthenticated, upload.fields([
    { name: 'attachments', maxCount: 3 },
    { name: 'images', maxCount: 3 },
]), collabController.updatePost);

router.delete('/delete/:id', isAuthenticated, collabController.deleteTopic)

router.delete('/destroy/:id', isAuthenticated, collabController.destroyTopic)

module.exports = router