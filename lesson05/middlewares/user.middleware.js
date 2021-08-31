const { userModel } = require('../database');
const ErrorHandler = require('../errors/ErrorHandler');
const { NOT_FOUND, CONFLICT, BAD_REQUEST } = require('../configs/status.codes.enum');
const { authValidators, userValidators } = require('../validators');

module.exports = {
    isEmailExist: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await userModel.findOne({ email: email.trim() });

            if (userByEmail) {
                throw new ErrorHandler(CONFLICT, 'email is already exists');
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserByIdExist: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const user = await userModel.findById(user_id).select('-password -__v');

            if (!user) {
                throw new ErrorHandler(NOT_FOUND, 'User not found');
            }

            req.user = user;

            next();
        } catch (err) {
            next(err);
        }
    },

    isUserByEmailExist: async (req, res, next) => {
        try {
            const { email } = req.body;

            const user = await userModel.findOne({ email: email.trim() });

            if (!user) {
                throw new ErrorHandler(NOT_FOUND, 'User not found');
            }

            req.user = user;

            next();
        } catch (err) {
            next(err);
        }
    },

    areUserFieldsValid: (req, res, next) => {
        try {
            // const { error, value } = userValidator.createUserValidator.validate(req.body);
            const { error, value } = userValidators.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
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
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
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
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
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
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
