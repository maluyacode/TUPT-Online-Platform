const mongoose = require('mongoose');

const commentModel = new mongoose.Schema({
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
}, { timestamps: true })

commentModel
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))
    .pre('findOne', Populate('comments'))
    .pre('find', Populate('comments'));

module.exports = mongoose.model('comment', commentModel)