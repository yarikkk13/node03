const { getUserByEmail, insertUser } = require('../services/user.service');
const { BAD_REQUEST, CREATE, UNAUTHORIZED } = require('../configs/status.codes.enum');

module.exports = {

    register: async (req, res) => {
        const {
            id, name, password, email
        } = req.body;

        if (id) {
            res.status(BAD_REQUEST).json({ error: 'change id' });
            return;
        }

        if (!name && !password && !email) {
            res.status(BAD_REQUEST).json({ error: 'change pass or name or email' });
            return;
        }

        if (name && name.search(/\d/) !== -1) {
            res.status(BAD_REQUEST).json({ error: 'number in name' });
            return;
        }

        const existsUser = await getUserByEmail(email);

        if (existsUser) {
            res.status(BAD_REQUEST).json({ error: 'this user is already exists' });
            return;
        }

        await insertUser(req.body);

        return res.status(CREATE).json('success');
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        const existsUser = await getUserByEmail(email);

        if (!existsUser) {
            res.status(BAD_REQUEST).json({ error: "this user doesn't exist" });
            return;
        }

        if (existsUser.password !== password) {
            res.status(UNAUTHORIZED).json({ error: 'incorrect password' });
            return;
        }

        return res.status(200).json('success');
    }

};
