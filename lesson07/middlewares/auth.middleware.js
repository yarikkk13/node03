const {
    configConstants,
    dbTablesEnum,
    statusCodes,
} = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');
const { jwtServices } = require('../services');
const { OauthModel } = require('../database');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(configConstants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCodes.UNAUTHORIZED, 'No token');
            }

            await jwtServices.verifyToken(token);

            const tokenFromDB = await OauthModel.findOne({ access_token: token }).populate(dbTablesEnum.USER);

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCodes.UNAUTHORIZED, 'Invalid token');
            }

            req.currentUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(configConstants.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(statusCodes.UNAUTHORIZED, 'No token');
            }

            await jwtServices.verifyToken(token, 'refresh');

            const tokenFromDB = await OauthModel.findOne({ refresh_token: token }).populate(dbTablesEnum.USER);

            if (!tokenFromDB) {
                throw new ErrorHandler(statusCodes.UNAUTHORIZED, 'Invalid token');
            }

            req.currentUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    },
};
