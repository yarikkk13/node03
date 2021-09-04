const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const { PORT, DB_CONNECT_URL } = require('./configs/config');

mongoose.connect(DB_CONNECT_URL);

const { authRouter, carRouter, userRouter } = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter);
app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use(_mainErrorHandler);

// application
app.listen(PORT, () => {
    // console.log('app listen port', PORT);
});

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message
        });
}
