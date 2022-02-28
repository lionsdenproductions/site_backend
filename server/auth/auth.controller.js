const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const _ = require('lodash');

const APIError = require('../helpers/APIError');
const config = require('../../config/config');

const User = require('../models/user.model');

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
    User.findOne({
            email: req.body.email
        })
        .select('+password')
        .then(user => {
            if (!user) {
                const err = new APIError('Wrong email and/or password...', httpStatus.NOT_FOUND, true);
                return next(err);
            }


            if (user) {
                user.verifyPassword(req.body.password, function(err, isMatch) {
                    if (isMatch && !err) {
                        const token = jwt.sign({
                            _id: user._id,
                            email: user.email,
                            username: user.username,
                            avatar: user.avatar,
                        }, config.jwtSecret);
                        return res.json({
                            user: _.pick(user, ['_id', 'username', 'email']),
                            token: token
                        });
                    } else {
                        const err = new APIError('Wrong email and/or password...', httpStatus.UNAUTHORIZED, true);
                        return next(err);
                    }
                });
            }
        })
        .catch(e => next(e));


}

/**
 * Returns jwt token after successfully registering a user
 * @param req 
 * @param res 
 * @param next 
 */
function signUp(req, res, next) {
    const origin = req.headers.origin;
    const user = new User({});
    if (req.body) {
        if (req.body.username)
            user.username = req.body.username;
        if (req.body.email)
            user.email = req.body.email;
        if (req.body.password)
            user.password = req.body.password;
    }

    user.save()
        .then(user => {
            const token = jwt.sign({
                username: user.username,
                email: user.email,
            }, config.jwtSecret);
            return res.json({
                user: _.pick(user, ['_id', 'username', 'email']),
                token: token
            });
        })
        .catch(e => {
            if (e.errmsg && e.errmsg.indexOf('duplicate key error') != -1) {
                if (e.errmsg.includes('username'))
                    e = new APIError('Username already registered', httpStatus.INTERNAL_SERVER_ERROR, true);
                else
                    e = new APIError('Email already registered', httpStatus.INTERNAL_SERVER_ERROR, true);
            }
            return next(e);
        });
}



/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
    // req.user is assigned by jwt middleware if valid token is provided
    return res.json({
        user: req.user,
        num: Math.random() * 100
    });
}

module.exports = {
    login,
    signUp,
    getRandomNumber
};