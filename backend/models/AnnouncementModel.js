const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    canViewBy: [{
        type: String, // parent, student, teacher.
    }],
    groupViewers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        default: null,
    },
    isForAll: {
        type: Boolean,
        required: true,
    },
    images: [{
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
        original_name: {
            type: String,
        }
    }],
    attachments: [{
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
        original_name: {
            type: String,
        }
    }],
    viewedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('announcement', AnnouncementSchema);

