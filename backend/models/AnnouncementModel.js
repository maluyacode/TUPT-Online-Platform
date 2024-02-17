// classified the user by section or by year

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Announcement schema
const AnnouncementSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    attachments: [String],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Create Announcement model
const Announcement = mongoose.model('Announcement', AnnouncementSchema);

module.exports = Announcement;
