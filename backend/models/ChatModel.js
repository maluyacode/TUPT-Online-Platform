const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    isGroup: {
        type: Boolean,
        default: false
    },
    chatName: {
        type: String
    }, // Only applicable if isGroup is true
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }, // Reference to the last message in the conversation
    unreadCount: {
        type: Number, default: 0
    }, // Number of unread messages
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deletedAt: {
        type: Date,
        default: null,
    }
}, { timestamps: true })

module.exports = mongoose.model('chat', chatSchema)