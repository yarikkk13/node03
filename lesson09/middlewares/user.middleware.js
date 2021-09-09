const { UserModel } = require('../database');
const ErrorHandler = require('../errors/ErrorHandler');
const { statusCodes } = require('../configs');
const { authValidators, userValidators } = require('../validators');

module.exports = {
    isEmailExist: (req, res, next) => {
        try {
            const { user } = req;

            if (user) {
                throw new ErrorHandler(statusCodes.CONFLICT, 'email is already exists');
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserByIdExist: (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, 'User not found');
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    isUserByEmailExist: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await UserModel.findOne({ email: email.trim() });

            if (!user) {
                throw new ErrorHandler(statusCodes.NOT_FOUND, 'User not found');
            }

            req.user = user;

            next();
        } catch (err) {
            next(err);
        }
    },

    areUserFieldsValid: (req, res, next) => {
        try {
            const { error, value } = userValidators.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    areUserFieldsValidForUpdate: (req, res, next) => {
        try {
            const { error, value } = userValidators.updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isSignInValid: (req, res, next) => {
        try {
            const { error, value } = authValidators.signInUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserIdValid: (req, res, next) => {
        try {
            const { error } = userValidators.userIdValidator.validate(req.params);

            if (error) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (roleArr = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            if (!roleArr.length) {
                return next();
            }

            if (!roleArr.includes(role)) {
                throw new ErrorHandler(statusCodes.FORBIDDEN, 'forbidden');
            }
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];

            const user = await UserModel.findOne({ [dbField]: value });

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
