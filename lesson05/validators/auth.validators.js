const Joi = require('joi');
const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../configs/constants');

module.exports = {
    signInUserValidator: Joi.object({
        email: Joi.string().trim().regex(EMAIL_REGEXP).trim()
            .required(),
        password: Joi.string().regex(PASSWORD_REGEXP).trim().required(),
    }),
};
