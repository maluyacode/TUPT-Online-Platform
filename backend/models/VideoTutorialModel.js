const mongoose = require('mongoose');

const videoTutorialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    video: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    isDisabled: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true })

module.exports = mongoose.model('videotutorial', videoTutorialSchema)