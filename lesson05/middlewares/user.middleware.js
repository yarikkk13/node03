const { userModel } = require('../database');
const ErrorHandler = require('../errors/ErrorHandler');
const { NOT_FOUND, CONFLICT, BAD_REQUEST } = require('../configs/status.codes.enum');
const userValidator = require('../validators/user.validator');

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

            const user = await userModel.findById(user_id);

            if (!user) {
                throw new ErrorHandler(NOT_FOUND, 'User not found');
            }

            req.user = user;

            next();
        } catch (err) {
            next(err);
        }
    },

    isAllFieldsPresent: (req, res, next) => {
        try {
            const { name, email } = req.body;

            if (!name || !email) {
                throw new ErrorHandler(BAD_REQUEST, 'Required fields are empty');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    areUserFieldsValid: (req, res, next) => {
        try {
            const { error, value } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(400, error.details[0].message);
            }

            // console.log('___________________________');
            // console.log(value);
            // console.log('___________________________');

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
};
