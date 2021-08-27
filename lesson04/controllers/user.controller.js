const { CREATE, NO_CONTENT } = require('../configs/status.codes.enum');
const { User } = require('../database');
const { userServices } = require('../services');

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
            const user = await User.create(req.body);
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
    //   getUserById: async (req, res, next) => {
    //     try {
    //       const { userId } = req.params;
    //       const user = await userService.findById(userId);
    //
    //       res.json(user);
    //     } catch (e) {
    //       next(e);
    //     }
    //   },

    deleteUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await userServices.removeUserById(user_id);

            res.status(NO_CONTENT).json(`user id: ${user_id} deleted`);
        } catch (e) {
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            await userServices.updateUserInfo(user_id, req.body);

            res.status(202).json('Update done successful');
        } catch (e) {
            next(e);
        }
    },
};
