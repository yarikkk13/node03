const S3 = require('aws-sdk/clients/s3');

const { fileUtils } = require('../utils');
const { mainConfigs } = require('../configs');

const bucket = new S3({
    region: mainConfigs.AWS_S3_REGION,
    accessKeyId: mainConfigs.AWS_S3_ACCESS_KEY,
    secretAccessKey: mainConfigs.AWS_S3_SECRET_KEY
});

module.exports = {
    uploadImage: (file, itemType, itemId) => {
        const { name, data, mimetype } = file;
        const uploadPath = fileUtils.fileNameBuilder(name, itemType, itemId.toString());

        return bucket
            .upload({
                Bucket: mainConfigs.AWS_S3_NAME,
                Body: data,
                Key: uploadPath,
                ContentType: mimetype
            })
            .promise();
    }
};
