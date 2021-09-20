module.exports = {
    PORT: process.env.PORT || 5000,
    DB_CONNECT_URL: process.env.DB_CONNECT_URL || 'mongodb://localhost:27017/inoxoft',

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'hello',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'world',
    FORGOT_PASS_TOKEN_SECRET: process.env.FORGOT_PASS_TOKEN_SECRET || 'superWord',

    EMAIL_HOST_USER: process.env.EMAIL_HOST_USER || 'test@gmail.com',
    EMAIL_HOST_PASSWORD: process.env.EMAIL_HOST_PASSWORD || '12345',
    FRONTED_URL: process.env.FRONTED_URL || 'http://localhost:5000',

    FIRST_ADMIN_EMAIL: process.env.FIRST_ADMIN_EMAIL || 'first_admin@gmail.com',
    FIRST_ADMIN_PASS: process.env.FIRST_ADMIN_PASS || 'Pass1@#$',

    AWS_S3_NAME: process.env.AWS_S3_NAME,
    AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
    AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    AWS_S3_REGION: process.env.AWS_S3_REGION,

    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:4200;http://localhost:3000:http://localhost:5000',
    SENTRY_DSN: process.env.SENTRY_DSN
};
