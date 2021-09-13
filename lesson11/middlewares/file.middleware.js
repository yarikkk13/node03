const { configConstants } = require('../configs');
const { BAD_REQUEST } = require('../configs/errors.enum');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {

    checkUserAvatar: (req, res, next) => {
        try {
            if (!req.files || !req.files.avatar) {
                next();
                return;
            }

            const { name, size, mimetype } = req.files.avatar;

            if (size > configConstants.MAX_AVATAR_SIZE) {
                throw new ErrorHandler(
                    BAD_REQUEST.FILE_IS_TOO_BIG.status,
                    BAD_REQUEST.FILE_IS_TOO_BIG.message,
                    BAD_REQUEST.FILE_IS_TOO_BIG.customCode,
                    `File ${name} is too big`
                );
            }

            if (!configConstants.PHOTOS_MIMETYPES.includes(mimetype)) {
                throw new ErrorHandler(
                    BAD_REQUEST.WRONG_FILE_FORMAT.status,
                    BAD_REQUEST.WRONG_FILE_FORMAT.message,
                    BAD_REQUEST.WRONG_FILE_FORMAT.customCode,
                    `Wrong file format ${name}`
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
