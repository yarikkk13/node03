const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/ErrorHandler');
const { statusCodes } = require('../configs');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hashPassword) => {
        const isPasswordsTheSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordsTheSame) {
            throw new ErrorHandler(statusCodes.BAD_REQUEST, 'email or password is incorrect');
        }
    }
};
