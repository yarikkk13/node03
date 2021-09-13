const cron = require('node-cron');

const removeExpiredTokens = require('./removeExpiredTokens');

module.exports = () => {
    cron.schedule('0 0 * * *', () => {
        console.log(`Cron start at ${new Date().toISOString()}`);
        removeExpiredTokens();
        console.log(`Cron finished at ${new Date().toISOString()}`);
    });
};
