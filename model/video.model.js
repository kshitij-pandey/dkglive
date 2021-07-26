const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    video_name: {
        type: String
    },
    description: {
        type: String
    },
    videoUrl: {
        type: String
    },
    date: {
        type: String,
        // default: Date.now
    }
}, {
    timestamps: true
})

module.exports = Video = mongoose.model('videos', videoSchema);