const mongoose = require('mongoose');

const incidentModel = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    incident_date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    reporting_person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('incident', incidentModel)