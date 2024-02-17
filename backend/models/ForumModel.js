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
    category: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    numOfReplies: {
        type: Number
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true,
        }
    }
}, { timestamps: true })

forumModel
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'));

module.exports = mongoose.model('forum', forumModel)