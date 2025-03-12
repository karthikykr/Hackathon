const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    className: String,
    subject: String,
    question: String,
    co: String,
    po: String,
    bl: String,
    type: String,
});

const QuestionModel = mongoose.model('Question', QuestionSchema);
module.exports = QuestionModel;
