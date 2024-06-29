
// quiz schema for the quiz collection in the database
const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    correct_answer: {
        type: String,
        required: true
    },
    incorrect_answers: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('Quiz', quizSchema);