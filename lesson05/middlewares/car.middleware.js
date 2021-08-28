const { carModel } = require('../database');
const ErrorHandler = require('../errors/ErrorHandler');
const { NOT_FOUND, BAD_REQUEST } = require('../configs/status.codes.enum');

module.exports = {
    isCarByIdExist: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            const car = await carModel.findById(car_id);

            if (!car) {
                throw new ErrorHandler(NOT_FOUND, 'Car not found');
            }

            req.car = car;

            next();
        } catch (e) {
            next(e);
        }
    },

    isAllFieldsPresent: (req, res, next) => {
        try {
            const { brand, year } = req.body;

            if (!brand || !year) {
                throw new ErrorHandler(BAD_REQUEST, 'Required fields are empty');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
