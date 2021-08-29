const { userServices } = require('../services');
const { userModel } = require('../database');
const { statusCodes } = require('../configs');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const allUsers = await userServices.findAll();

            res.status(statusCodes.OK).json(allUsers);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = await userServices.insertUser(req.body);

            res.status(statusCodes.CREATE).json(user);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            res.status(statusCodes.OK).json(req.user);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await userServices.removeUserById(user_id);

            res.status(statusCodes.NO_CONTENT).json('user deleted');
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await userModel.findByIdAndUpdate(user_id, req.body);

            res.status(statusCodes.ACCEPTED).json('Update done successful');
        } catch (e) {
            next(e);
        }
    },
};
