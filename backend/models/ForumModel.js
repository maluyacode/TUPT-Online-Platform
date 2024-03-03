const mongoose = require('mongoose');

const forumModel = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    category: [{
        type: String,
        required: true
    }],
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
}, { timestamps: true })

module.exports = mongoose.model('forum', forumModel)