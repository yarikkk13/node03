const Joi = require('joi');

const userRolesEnum = require('../configs/user.roles.enum');
const { CURRENT_YEAR } = require('../configs/constants');
const { configConstants } = require('../configs');

const createUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30)
        .trim()
        .required(),

    password: Joi.string().regex(configConstants.PASSWORD_REGEXP).trim().required(),
    born_year: Joi.number().integer().min(CURRENT_YEAR - 120).max(CURRENT_YEAR - 6),
    email: Joi.string().regex(configConstants.EMAIL_REGEXP).trim().required(),

    role: Joi.string().allow(...Object.values(userRolesEnum)),

    car: Joi.boolean(),
});

const updateUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30)
        .trim(),
    email: Joi.string().regex(configConstants.EMAIL_REGEXP).trim(),
});

const userIdValidator = Joi.object({
    user_id: Joi.string().trim().regex(configConstants.ID_REGEXP)
});

module.exports = {
    createUserValidator,
    updateUserValidator,
    userIdValidator
};
