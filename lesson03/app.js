const express = require('express');
const { PORT } = require('./configs/config');
const { userRouter } = require('./routes');
// const handlebars = require('express-handlebars');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.set('view engine', '.hbs');
// app.engine('.hbs', handlebars({ defaultLayout: false }));
// app.set('views', staticPath);

app.use('/users', userRouter);

// application
app.listen(PORT, () => {
    // console.log('app listen port', PORT);
});
