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
    canViewBy: [{ // not applicable
        type: String, // parent, student, teacher.
        default: ["parent", "student", "teacher"]
    }],
    groupViewers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group',
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
    viewedBy: [{ // not applicable
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    forceDeletedAt: {
        type: Date,
        default: null,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

AnnouncementSchema.pre('findOneAndUpdate', function (next) {
    this._update.updatedAt = new Date();
    next();
});

module.exports = mongoose.model('announcement', AnnouncementSchema);

