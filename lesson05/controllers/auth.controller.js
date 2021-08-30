const { passwordServices, userServices } = require('../services');
const { userUtils } = require('../utils');
const { statusCodes } = require('../configs');

module.exports = {

    register: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashPassword = await passwordServices.hash(password);
            const user = await userServices.insertUser({ ...req.body, password: hashPassword });

            const normalizedUser = userUtils.userNormalizator(user);

            res.status(statusCodes.CREATE).json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    signIn: async (req, res, next) => {
        try {
            const { password } = req.body;
            const { user } = req;

            await passwordServices.compare(password, user.password);

            res.status(statusCodes.OK).json('sign in successful');
        } catch (e) {
            return next(e);
        }
    },

};
