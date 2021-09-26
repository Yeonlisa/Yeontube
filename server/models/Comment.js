const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.objectId,
        ref:'User'
    },
    postId: {
        type: Schema.Types.objectId,
        ref:'Video'
    },
    responseTo: {
        type: Schema.Types.objectId,
        ref:'User'
    },
    content: {
        type: String
    }
}, { timestamps: true})


const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }