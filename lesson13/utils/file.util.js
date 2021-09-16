const uuid = require('uuid').v1;
const path = require('path');

module.exports = {
    fileNameBuilder: (fileName, itemType, itemId) => {
        const fileExtension = fileName.split('.').pop();

        return path.join(itemType, itemId, `${uuid()}.${fileExtension}`);
    }
};
