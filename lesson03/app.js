const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');

const {PORT} = require('./configs/config');
const {CREATE, NOT_FOUND} = require('./configs/status.codes.enum');
const {readFile, writeFile} = require('./helpers/async');


const app = express();
const staticPath = path.join(__dirname, 'static');
const usersPath = path.join(__dirname, 'database', 'users.json');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(staticPath));

app.set('view engine', '.hbs');
app.engine('.hbs', handlebars({defaultLayout: false}));
app.set('views', staticPath);

let loginned = false;

//logination1
app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const getUserByEmail = async (email) => {
        const getUser = await readFile(usersPath);
        const user = JSON.parse(getUser);
        return await user.find(user => user.email === email);
    }
    const user = await getUserByEmail(email);
    if (!user) {
        return res.status(NOT_FOUND).redirect('/registering');
    }
    if (user.password !== password) {
        return res.status(NOT_FOUND)
            .json({"message": "Check your password"})
    } else {
        loginned = true
        return res.redirect('/users');
    }
});

//registering
app.post('/registering', async (req, res) => {
    const {name, email, password} = req.body;

    const getUserByEmail = async (email) => {
        const getUser = await readFile(usersPath);
        const user = JSON.parse(getUser);
        return await user.find(user => user.email === email);
    }
    const user = await getUserByEmail(email);
    if (!user) {
        const addUsers = async (user) => {
            const getAllUsers = async () => {
                const getUser = await readFile(usersPath);
                return JSON.parse(getUser);
            }
            const users = await getAllUsers();
            users.push(user);
            await writeFile(usersPath, JSON.stringify(users));
        }
        await addUsers({name, email, password});
        return res.status(CREATE).redirect('/login');
    }
    return res.redirect('/login');
});
// render endpoints

app.get('/login', (req, res) => {
    res.render('login', {loginned})
})

app.get('/registering', (req, res) => {
    return res.render('register');
});

app.get('/users', async (req, res) => {
    const getAllUsers = async () => {
        const getUser = await readFile(usersPath);
        return JSON.parse(getUser);
    }
    let users = await getAllUsers()
    return res.render('users', {users});
})

// application
app.listen(PORT, () => {
    console.log('app listen port', PORT)
})