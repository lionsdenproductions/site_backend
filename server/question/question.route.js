const express = require('express');
const validate = require('express-validation');

const paramValidation = require('../../config/param-validation');
const authCheck = require('../middleware/auth_check');

const questionCtrl = require('./question.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    /** GET /api/questions - Get list of questions */
    .get(questionCtrl.list)
    /** POST /api/questions - Create new question */
    .post(authCheck, validate((paramValidation.question)), questionCtrl.create);

router.route('/:id')
    /** GET /api/products/:itemId/ */
    .get(questionCtrl.getDetail)


module.exports = router;