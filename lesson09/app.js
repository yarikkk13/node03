const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const { statusCodes, mainConfigs } = require('./configs');

mongoose.connect(mainConfigs.DB_CONNECT_URL);

const {
    authRouter, carRouter, userRouter, adminRouter
} = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter);
app.use('/admin', adminRouter);
app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use(_mainErrorHandler);

// application
app.listen(mainConfigs.PORT, () => {
    // console.log('app listen port', PORT);
});

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || statusCodes.SERVER_ERROR)
        .json({
            message: err.message
        });
}
