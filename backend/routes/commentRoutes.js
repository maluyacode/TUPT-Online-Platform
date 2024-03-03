const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const commentController = require('../controllers/commentController');
const { isAuthenticated } = require('../middlewares/Auth');

router.post('/create', isAuthenticated, upload.fields([
    { name: 'attachments', maxCount: 3 },
    { name: 'images', maxCount: 3 },
]), commentController.createComment)

router.delete('/delete/:id', isAuthenticated, commentController.deleteComment);

module.exports = router