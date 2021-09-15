const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const { OauthModel, ActionTokenModel } = require('../database');

module.exports = async () => {
    const previousMonth = dayjs.utc().subtract(1, 'month');

    await OauthModel.deleteMany({ createdAt: { $lte: previousMonth } });
    await ActionTokenModel.deleteMany({ createdAt: { $lte: previousMonth } });
};
