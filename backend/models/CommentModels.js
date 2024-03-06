const mongoose = require('mongoose');

const commentModel = new mongoose.Schema({
    textContent: {
        type: String,
        // required: true
    },
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    forum: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'forum',
        required: true
    },
    repliedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
        default: null,
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
    deletedAt: {
        type: Date,
        default: null,
    }
}, { timestamps: true })


module.exports = mongoose.model('comment', commentModel)