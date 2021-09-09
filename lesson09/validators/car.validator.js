const Joi = require('joi');

const { CURRENT_YEAR, YEAR_OF_FIRST_CAR } = require('../configs/constants');
const { configConstants } = require('../configs');

module.exports = {
    createCarValidator: Joi.object({
        brand: Joi.string().trim().required(),

        year: Joi.number().integer().min(YEAR_OF_FIRST_CAR).max(CURRENT_YEAR)
            .required(),

        model: Joi.string().trim()
    }),

    updateCarValidator: Joi.object({
        brand: Joi.string().trim(),

        year: Joi.number().integer().min(YEAR_OF_FIRST_CAR).max(CURRENT_YEAR),

        model: Joi.string().trim()
    }),

    carIdValidator: Joi.object({
        car_id: Joi.string().trim().regex(configConstants.ID_REGEXP)
    }),
};
