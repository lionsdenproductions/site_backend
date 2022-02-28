const Joi = require('joi');

module.exports = {
    // POST /api/auth/login
    login: {
        body: {
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    },

    // POST /api/auth/signup
    signup: {
        body: {
            username: Joi.string().min(1).required(),
            email: Joi.string().email().max(255).required(),
            password: Joi.string().min(6).required()
        }
    },

    // POST /api/question
    question: {
        body: {
            title: Joi.string().min(1).max(100).required(),
            // description: Joi.string().min(5).required(),
        }
    }

};