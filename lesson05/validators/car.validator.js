const Joi = require('joi');

const { CURRENT_YEAR } = require('../configs/constants');

module.exports = {
    createCarValidator: Joi.object({
        brand: Joi.string().trim().required(),
        year: Joi.number().integer().min(1886).max(CURRENT_YEAR)
            .required(),
        model: Joi.string().trim()
    }),
    updateCarValidator: Joi.object({
        brand: Joi.string().trim(),
        year: Joi.number().integer().min(1886).max(CURRENT_YEAR),
        model: Joi.string().trim()
    }),
};
