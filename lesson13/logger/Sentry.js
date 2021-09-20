const Sentry = require('@sentry/node');

const { SENTRY_DSN } = require('../configs/config');

console.log('_________________________');
console.log(SENTRY_DSN);
console.log('_________________________');

Sentry.init({
    dsn: SENTRY_DSN
});

module.exports = Sentry;
