const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const userController = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/Auth');

router.post('/register', upload.single('avatar'), userController.registerUser, userController.regsteredByAdmin);
router.post('/verification', isAuthenticated, userController.verifyCode);
router.get('/resend-code', isAuthenticated, userController.reSendCode);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);
router.put('/update/:id', isAuthenticated, upload.single('avatar'), userController.updateUser);
router.get('/profile/:id', isAuthenticated, upload.single('avatar'), userController.getUserProfile);
router.post('/forgot-password', userController.forgotUserPassword);
router.put('/reset-password/:token', userController.resetUserPassword);
router.delete('/delete/:id', isAuthenticated, userController.deleteUser)

router.get('/lists', isAuthenticated, userController.getAllUsers);

module.exports = router