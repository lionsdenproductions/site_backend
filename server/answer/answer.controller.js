const httpStatus = require('http-status');
const path = require('path');

const APIError = require('../helpers/APIError');
const Answer = require('../models/answer.model');

function create(req, res, next) {

    let answer = new Answer({});
    let user = req.user;

    if (req.body.description)
        answer.description = req.body.description;
    if (req.body.question)
        answer.question = req.body.question;

    answer.author = {
        userId: user._id,
        username: user.username,
        email: user.email,
    }

    answer.save()
        .then(answer => {
            res.json(answer);
        })
        .catch(e => next(e));

}

function list(req, res, next) {
    const {
        limit = 15, skip = 0
    } = req.query;

    let result = {};

    Answer.find({ 'question.questionId': req.params.id })
        .sort({
            createdAt: -1
        })
        .skip(+skip)
        .limit(+limit)
        .then(answer => {
            result.answer = answer;
            // answer.count(query)
            return Answer.count();
        })
        .then(count => {
            result.count = count;
            res.json(result);
        })
        .catch(e => next(e));
}

module.exports = {
    create,
    list,
}