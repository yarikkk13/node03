const { emailServices, passwordServices, userServices, } = require('../services');
const { userUtils, } = require('../utils');
const { UserModel } = require('../database');
const { statusCodes, emailActionsEnum } = require('../configs');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const allUsers = await userServices.findAll().select('-password -__v');

            res.status(statusCodes.OK).json(allUsers);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashPassword = await passwordServices.hash(password);
            const user = await userServices.insertUser({ ...req.body, password: hashPassword });

            const normalizedUser = userUtils.userNormalizator(user);

            await emailServices.sendMail(normalizedUser.email, emailActionsEnum.WELCOME, { userName: req.user.name });

            res.status(statusCodes.CREATE).json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const normalizedUser = userUtils.userNormalizator(req.user);

            res.status(statusCodes.OK).json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await emailServices.sendMail(req.user.email, emailActionsEnum.GOODBYE, { userName: req.user.name });

            await userServices.removeUserById(user_id);

            res.status(statusCodes.NO_CONTENT).json('user deleted');
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await UserModel.findByIdAndUpdate(user_id, req.body);

            res.status(statusCodes.ACCEPTED).json('Update done successful');
        } catch (e) {
            next(e);
        }
    },
};
