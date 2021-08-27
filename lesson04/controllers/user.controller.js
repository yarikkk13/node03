const { userServices } = require('../services');
const { userModel } = require('../database');
const { CREATE, NO_CONTENT, ACCEPTED } = require('../configs/status.codes.enum');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const allUsers = await userServices.findAll();

            res.json(allUsers);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = await userServices.insertUser(req.body);

            res.status(CREATE).json(user);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await userServices.removeUserById(user_id);

            res.status(NO_CONTENT).json('user deleted');
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await userModel.findByIdAndUpdate(user_id, req.body);

            res.status(ACCEPTED).json('Update done successful');
        } catch (e) {
            next(e);
        }
    },
};
