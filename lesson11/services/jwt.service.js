const jwt = require('jsonwebtoken');

const ErrorHandler = require('../errors/ErrorHandler');
const { actionTypesEnum, mainConfigs, statusCodes, } = require('../configs');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, mainConfigs.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, mainConfigs.REFRESH_TOKEN_SECRET, { expiresIn: '28d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: (token, tokenType = 'access') => {
        try {
            const secret = tokenType === 'access' ? mainConfigs.ACCESS_TOKEN_SECRET : mainConfigs.REFRESH_TOKEN_SECRET;

            jwt.verify(token, secret);
        } catch (e) {
            throw new ErrorHandler(statusCodes.UNAUTHORIZED, 'Invalid token');
        }
    },

    generateActionToken: (actionType) => {
        let word = '';

        switch (actionType) {
            case actionTypesEnum.FORGOT_PASS:
                word = mainConfigs.FORGOT_PASS_TOKEN_SECRET;
                break;
            case actionTypesEnum.FIRST_LOGIN:
                word = 'father';
                break;
            default:
                throw new ErrorHandler(statusCodes.SERVER_ERROR, 'wrong action type');
        }

        return jwt.sign({ actionType }, word, { expiresIn: '7d' });
    },

    verifyActionToken: (actionType, token) => {
        let word = '';

        switch (actionType) {
            case actionTypesEnum.FORGOT_PASS:
                word = mainConfigs.FORGOT_PASS_TOKEN_SECRET;
                break;
            case actionTypesEnum.FIRST_LOGIN:
                word = 'father';
                break;
            default:
                throw new ErrorHandler(statusCodes.SERVER_ERROR, 'wrong action type');
        }

        return jwt.verify(token, word);
    },

};
