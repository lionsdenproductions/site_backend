const mongoose = require('mongoose');
let Schema = mongoose.Schema;
/**
 * Question Schema
 */
const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    tags: [String],
    author: {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        username: String,
        avatar: String
    },
}, {
    timeStamp: true
});


module.exports = mongoose.model('Question', QuestionSchema);