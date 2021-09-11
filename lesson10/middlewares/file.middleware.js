const { statusCodes, configConstants } = require('../configs');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {

    checkUserAvatar: (req, res, next) => {
        try {
            const { avatar } = req.files;

            if (!avatar) {
                next();
                return;
            }
            const { name, size, mimetype } = avatar;

            if (size > configConstants.MAX_AVATAR_SIZE) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, `File ${name} is too big`);
            }

            if (!configConstants.PHOTOS_MIMETYPES.includes(mimetype)) {
                throw new ErrorHandler(statusCodes.BAD_REQUEST, `Wrong file format ${name}`);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
