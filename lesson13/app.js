const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const swaggerUI = require('swagger-ui-express');
const helmet = require('helmet');

require('dotenv').config();

const app = express();

const { statusCodes, mainConfigs } = require('./configs');
const swaggerJson = require('./documents/swagger.json');
const { userController } = require('./controllers');
const {
    authRouter, carRouter, userRouter, adminRouter
} = require('./routes');
const cronJobs = require('./cron');

mongoose.connect(mainConfigs.DB_CONNECT_URL);

app.use(cors({ origin: _configureCors }));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());
app.use(helmet());

if (process.env.ENV === 'dev') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

app.use('/documents', swaggerUI.serve, swaggerUI.setup(swaggerJson, { explorer: true }));
app.use('/', authRouter);
app.use('/admin', adminRouter);
app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use(_mainErrorHandler);

// application
app.listen(mainConfigs.PORT, () => {
    // console.log('app listen port', PORT);
    userController.createFirstAdmin();
    cronJobs();
});

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || statusCodes.SERVER_ERROR)
        .json({
            message: err.message || 'Unknown error',
            customCode: err.customCode,
            data: err.data
        });
}

function _configureCors(origin, callback) {
    const whiteList = mainConfigs.ALLOWED_ORIGIN.split(';');

    if (!origin) {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new Error('Cors not allowed'), false);
    }

    return callback(null, true);
}
