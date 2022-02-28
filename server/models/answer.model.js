const mongoose = require('mongoose');
let Schema = mongoose.Schema;
/**
 * Question Schema
 */
const AnswerSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    author: {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        username: String,
        avatar: String
    },
    question: {
        questionId: {
            type: Schema.Types.ObjectId,
            ref: "Question",
            required: true
        },
        title: String
    }
}, {
    timeStamp: true
});


module.exports = mongoose.model('Answer', AnswerSchema);