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

router.put('/edit/:id', isAuthenticated, commentController.editComment)

router.delete('/delete/attached/:id', isAuthenticated, commentController.deleteCommentedFile)

module.exports = router