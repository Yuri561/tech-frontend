// video schema for the video collection in the database

const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dateUploaded: {
        type: Date,
        default: Date.now,
    }
});


module.exports = mongoose.model('Video', videoSchema);