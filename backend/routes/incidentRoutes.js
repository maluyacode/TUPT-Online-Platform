const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const incidentController = require('../controllers/incidentController');
const { isAuthenticated, isAuthorized } = require('../middlewares/Auth');

router.post('/report', isAuthenticated, upload.any(), incidentController.reportIncident)

router.get('/by-month', isAuthenticated, isAuthorized('admin'), incidentController.incidentsByMonth);

router.get('/most-incidents-occur', isAuthenticated, isAuthorized('admin'), incidentController.mostIncidentsOccur);

router.get('/incident-locations', isAuthenticated, isAuthorized('admin'), incidentController.incidentLocations)

router.get('/get-all', isAuthenticated, incidentController.getAllReports);

module.exports = router