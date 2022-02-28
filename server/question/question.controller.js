const httpStatus = require('http-status');
const path = require('path');

const APIError = require('../helpers/APIError');
const Question = require('../models/question.model');

function create(req, res, next) {

    let question = new Question({});
    let user = req.user;

    if (req.body.title)
        question.title = req.body.title;
    if (req.body.description)
        question.description = req.body.description;
    if (req.body.tags)
        question.tags = [req.body.tags];

    question.author = {
        userId: user._id,
        username: user.username,
        email: user.email,
    }

    question.save()
        .then(question => {
            res.json(question);
        })
        .catch(e => next(e));

}

function list(req, res, next) {
    const { limit = 15, skip = 0 } = req.query;

    let result = {};

    Question.find()
        .sort({ createdAt: -1 })
        .skip(+skip)
        .limit(+limit)
        .then(questions => {
            result.questions = questions;
            // question.count(query)
            return Question.count();
        })
        .then(count => {
            result.count = count;
            res.json(result);
        })
        .catch(e => next(e));
}

function getDetail(req, res, next) {

    Question.findById(req.params.id)
        .then(result => {
            res.json(result);
        })
        .catch(e => next(e));

}

module.exports = {
    create,
    list,
    getDetail
}