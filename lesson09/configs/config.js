module.exports = {
    PORT: process.env.PORT || 5000,
    DB_CONNECT_URL: process.env.DB_CONNECT_URL || 'mongodb://localhost:27017/inoxoft',

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'hello',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'world',
    FORGOT_PASS_TOKEN_SECRET: process.env.FORGOT_PASS_TOKEN_SECRET || 'superWord',

    EMAIL_HOST_USER: process.env.EMAIL_HOST_USER || 'test@gmail.com',
    EMAIL_HOST_PASSWORD: process.env.EMAIL_HOST_PASSWORD || '12345',
    FRONTED_URL: process.env.FRONTED_URL || 'https://inoxoft.com',
};
