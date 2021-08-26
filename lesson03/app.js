const express = require('express');
const { PORT } = require('./configs/config');
const { userRouter, authRouter } = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter);
app.use('/users', userRouter);

// application
app.listen(PORT, () => {
    // console.log('app listen port', PORT);
});
