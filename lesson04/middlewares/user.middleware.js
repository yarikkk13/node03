const { userModel } = require('../database');
const ErrorHandler = require('../errors/ErrorHandler');
const { NOT_FOUND } = require('../configs/status.codes.enum');

module.exports = {
    isEmailExist: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await userModel.findOne({ email: email.trim() });

            if (userByEmail) {
                throw new ErrorHandler(409, 'email is already exists');
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
                throw new ErrorHandler(400, 'Required fields are empty');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
