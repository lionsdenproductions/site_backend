const express = require('express');
const authRoutes = require('./server/auth/auth.route');
const questionRoutes = require('./server/question/question.route');
const answerRoutes = require('./server/answer/answer.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.send('OK')
);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount question routes at /question
router.use('/questions', questionRoutes);

// mount answer routes at /answer
router.use('/answer', answerRoutes);

module.exports = router;