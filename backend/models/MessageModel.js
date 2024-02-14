const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    readBy: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ], // Users who have read the message
    attachments: [
        {
            type: String
        }
    ], // Array of URLs to message attachments
}, { timestamps: true })

module.exports = mongoose.model('Message', messageSchema)