const User = require('../models/UserModel');
const Incident = require('../models/IncidentModel');
const crypto = require('crypto');
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const { uploadSingle, uploadMultiple, destroyUploaded } = require('../utils/cloudinaryUpload');
const { sendCodeToEmail, sendCodeToContact, verifyEmailAndContactCode, verifyAccount } = require('../utils/verification');
const sendSMS = require('../utils/sendSMS');

exports.reportIncident = async (req, res, next) => {

    try {

        req.body.reporting_person = req.user._id;

        const incident = await Incident.create(req.body);

        res.json({
            success: true,
            message: 'Thank you for your report!',
            incident,
        });

    } catch (error) {
        console.log(error)
        res.status(400);
        // throw new Error(error.message);
    }
}

exports.incidentsByMonth = async (req, res, next) => {

    try {

        const months = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];

        const incidentsByMonth = {};

        const year = Number.parseInt(req.query.year); // Assuming req.body.year contains the desired year

        const result = await Incident.aggregate([
            {
                $match: {
                    $expr: { $eq: [{ $year: { $toDate: '$incident_date' } }, year] }
                }
            },
            {
                $project: {
                    location: 1,
                    incident_date: 1,
                    description: 1,
                    type: 1,
                    reporting_person: 1,
                    month: { $month: { $toDate: '$incident_date' } }
                }
            },
            {
                $group: {
                    _id: '$month',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Sort the months array based on their numerical values
        months.sort((a, b) => new Date('2000 ' + a) - new Date('2000 ' + b));

        months.forEach(monthName => {
            const monthIndex = months.indexOf(monthName) + 1; // Months are one-indexed
            const monthData = result.find(data => data._id === monthIndex);
            const incidentCount = monthData ? monthData.count : 0;
            incidentsByMonth[monthName] = incidentCount;
        });


        res.json({
            success: true,
            message: 'Thank you for your report!',
            incidentsByMonth: incidentsByMonth
        });

    } catch (error) {
        console.log(error)
        res.status(400);
        // throw new Error(error.message);
    }
}


exports.mostIncidentsOccur = async (req, res, next) => {

    try {

        const aggregateResult = await Incident.aggregate([
            {
                $group: {
                    _id: '$type',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Convert the result to key-value pairs
        const groupedIncidents = {};
        aggregateResult.forEach(({ _id, count }) => {
            groupedIncidents[_id] = count;
        });


        res.status(200).json({
            success: true,
            countIncidents: groupedIncidents
        });

    } catch (error) {
        console.log(error)
        res.status(400);
        // throw new Error(error.message);
    }

}

exports.incidentLocations = async (req, res, next) => {

    try {

        const aggregateResult = await Incident.aggregate([
            {
                $group: {
                    _id: '$location',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Convert the result to key-value pairs
        const groupedIncidents = {};
        aggregateResult.forEach(({ _id, count }) => {
            groupedIncidents[_id] = count;
        });


        res.status(200).json({
            success: true,
            incidentLocations: groupedIncidents
        });

    } catch (error) {
        console.log(error)
        res.status(400);
        // throw new Error(error.message);
    }

}

exports.getAllReports = async (req, res, next) => {

    try {


        let locations = await Incident.find().select('location -_id');
        let types = await Incident.find().select('type -_id');

        let filteredLocations = []
        locations.filter(location => {
            if (!filteredLocations.includes(location.location)) {
                filteredLocations.push(location.location)
            }
        })

        let filteredTypes = [];
        types.filter(type => {
            if (!filteredTypes.includes(type.type)) {
                filteredTypes.push(type.type)
                console.log(type.type)
            }
        })

        locations = filteredLocations.map(location => {
            return {
                value: location,
                label: location
            }
        })

        types = filteredTypes.map(type => {
            return {
                value: type,
                label: type
            }
        })

        res.status(200).json({
            success: true,
            locations: locations,
            types: types,
        });

    } catch (error) {
        console.log(error)
        res.status(400);
        // throw new Error(error.message);
    }

}