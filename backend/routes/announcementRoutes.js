const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const announcementController = require('../controllers/announcementController');
const { isAuthenticated } = require('../middlewares/Auth');

router.post('/create', isAuthenticated, upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'files', maxCount: 5 }
]), announcementController.createAnnouncement);

router.get('/get-all', isAuthenticated, announcementController.getAllAnnouncements);

router.get('/get-single/:id', isAuthenticated, announcementController.getSingleAnnouncement);

router.put('/update/:id', isAuthenticated, upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'files', maxCount: 5 }
]), announcementController.updateAnnouncement);

router.delete('/delete/:id', isAuthenticated, announcementController.deleteAnnouncement);

router.get('/get-my-announcement/:id', isAuthenticated, announcementController.getAnnouncementsOfTeacher)

module.exports = router