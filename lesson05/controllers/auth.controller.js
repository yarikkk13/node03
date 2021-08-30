const { passwordServices, userServices } = require('../services');
const { userUtils } = require('../utils');
const { statusCodes } = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');

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

            const passwordIdentical = await passwordServices.compare(password, user.password);

            if (!passwordIdentical) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, 'email or password is incorrect');
            }

            res.status(statusCodes.OK).res.json('sign in successful');
        } catch (e) {
            return next(e);
        }
    },

};
