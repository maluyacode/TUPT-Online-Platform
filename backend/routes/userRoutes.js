const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const userController = require('../controllers/userController.js');
const { isAuthenticated, isAuthorized } = require('../middlewares/Auth');

router.post('/register', upload.single('avatar'), userController.registerUser, userController.regsteredByAdmin);

router.post('/verification', isAuthenticated, userController.verifyCode);

router.get('/resend-code', isAuthenticated, userController.reSendCode);

router.post('/login', userController.loginUser);

router.get('/logout', userController.logoutUser);

router.put('/update/:id', isAuthenticated, upload.single('avatar'), userController.updateUser);

router.get('/profile/:id', isAuthenticated, upload.single('avatar'), userController.getUserProfile);

router.post('/forgot-password', userController.forgotUserPassword);

router.put('/reset-password/:token', upload.any(), userController.resetUserPassword);

router.put('/update-password', isAuthenticated, upload.any(), userController.updateUserPassword)

router.delete('/delete/:id', isAuthenticated, isAuthorized('admin'), userController.deleteUser)

router.post('/send-email', isAuthenticated, upload.fields([
    { name: 'attachments', maxCount: 5 },
]), userController.emailUsers);

router.post('/send-sms', isAuthenticated, upload.single('attachments'), userController.sendSMStoUsers);

router.get('/lists', isAuthenticated, userController.getAllUsers);

router.get('/get-users-free-access', userController.getUsersFreeAccess);

router.get('/accept-as-parent/:id', isAuthenticated, userController.acceptParentRequest)

router.get('/reject-as-parent/:id', isAuthenticated, userController.rejectParentRequest)


module.exports = router