const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId, // 아이디만 넣어도
        ref: 'User' // User 모델에 있는 모든 정보들을 불러올 수 있다.
    },
    title: {
        type: String,
        maxlength: 50
    },
    description : {
        type: String
    },
    privacy: {
        type: Number
    },
    filePath: {
        type: String
    },
    category: {
        type: String
    },
    views: {
        type: Number,
        default: 0 // views 수가 0부터 시작함
    },
    duration: {
        type: String
    },
    thumbnail : {
        type: String
    }
}, { timestamps: true})


const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }