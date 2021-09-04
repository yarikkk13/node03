const { jwtServices, passwordServices, userServices } = require('../services');
const { userUtils } = require('../utils');
const { statusCodes, configConstants } = require('../configs');
const { OauthModel } = require('../database');

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

    login: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await passwordServices.compare(password, user.password);

            const tokenPair = jwtServices.generateTokenPair();

            await OauthModel.create({ ...tokenPair, user: user._id });

            res.json({
                ...tokenPair,
                user: userUtils.userNormalizator(user)
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const token = req.get(configConstants.AUTHORIZATION);

            await OauthModel.deleteOne({ access_token: token });

            res.status(statusCodes.NO_CONTENT).json('Ok');
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const token = req.get(configConstants.AUTHORIZATION);
            const { currentUser } = req;

            await OauthModel.deleteOne({ refresh_token: token });

            const tokenPair = jwtServices.generateTokenPair();

            await OauthModel.create({ ...tokenPair, user: currentUser._id });

            res.json({
                ...tokenPair,
                user: userUtils.userNormalizator(currentUser)
            });
        } catch (e) {
            next(e);
        }
    },
};
