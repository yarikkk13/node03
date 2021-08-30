const express = require('express');
const mongoose = require('mongoose');

const app = express();

const { PORT } = require('./configs/config');

mongoose.connect('mongodb://localhost:27017/inoxoft');

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
