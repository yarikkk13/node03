const jwt = require('jsonwebtoken');

const ErrorHandler = require('../errors/ErrorHandler');
const { statusCodes, mainConfigs } = require('../configs');

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
    }
};
