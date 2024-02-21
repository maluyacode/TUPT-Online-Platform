const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    groupName: {
        type: String,
        required: true
    },
    members: {
        type: String,
        required: true
    },
    coverPhoto: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps });

const Group = mongoose.model('Announcement', GroupSchema);

module.exports = Group;
