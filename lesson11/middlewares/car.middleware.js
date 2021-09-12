const { CarModel } = require('../database');
const ErrorHandler = require('../errors/ErrorHandler');
const { NOT_FOUND, BAD_REQUEST } = require('../configs/status.codes.enum');
const carValidator = require('../validators/car.validator');
const { statusCodes } = require('../configs');

module.exports = {
    isCarByIdExist: (req, res, next) => {
        try {
            const { car } = req;

            if (!car) {
                throw new ErrorHandler(NOT_FOUND, 'Car not found');
            }

            req.car = car;

            next();
        } catch (e) {
            next(e);
        }
    },

    areCarFieldsValid: (req, res, next) => {
        try {
            const { error, value } = carValidator.createCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    areCarFieldsValidForUpdate: (req, res, next) => {
        try {
            const { error, value } = carValidator.updateCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isCarIdValid: (req, res, next) => {
        try {
            const { error } = carValidator.carIdValidator.validate(req.params);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getCarByDynamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const car = await CarModel.findOne({ [dbField]: value });

            req.car = car;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserOwnerOfCar: (req, res, next) => {
        try {
            const { currentUser, car } = req;

            const currentUserId = currentUser._id.toString();
            const carOwnerId = car.user.toString();

            if (currentUserId !== carOwnerId) {
                throw new ErrorHandler(statusCodes.FORBIDDEN, "can't touch this");
            }

            next();
        } catch (e) {
            next(e);
        }
    },

};
