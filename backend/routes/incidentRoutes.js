const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const incidentController = require('../controllers/incidentController');
const { isAuthenticated } = require('../middlewares/Auth');

router.post('/report', isAuthenticated, upload.any(), incidentController.reportIncident)

router.get('/by-month', isAuthenticated, incidentController.incidentsByMonth);

router.get('/most-incidents-occur', isAuthenticated, incidentController.mostIncidentsOccur);

router.get('/incident-locations', isAuthenticated, incidentController.incidentLocations)

module.exports = router