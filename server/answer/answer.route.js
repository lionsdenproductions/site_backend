const express = require('express');
const validate = require('express-validation');

// const paramValidation = require('../../config/param-validation');
const authCheck = require('../middleware/auth_check');

const answerCtrl = require('./answer.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    /** POST /api/answers - Create new question */
    // validate((paramValidation.question)),
    .post(authCheck, answerCtrl.create);

router.route('/:id')
    /** GET /api/answers/:questionId/ */
    .get(answerCtrl.list)


module.exports = router;