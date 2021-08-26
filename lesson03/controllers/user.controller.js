const {
    findAll, insertUser, removeUserByID, updateUserInfo, getUserByID
} = require('../services/user.service');
const { BAD_REQUEST, NOT_FOUND } = require('../configs/status.codes.enum');

module.exports = {
    getAllUser: async (req, res) => {
        const allUsers = await findAll();

        res.json(allUsers);
    },

    createUser: async (req, res) => {
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
        await insertUser(req.body);
        res.json('success');
    },

    getUserById: async (req, res) => {
        const { id } = req.params;
        const singleUser = await getUserByID(id);
        if (!singleUser) {
            res.status(NOT_FOUND).json({ error: 'user not found' });
            return;
        }
        req.user = singleUser;
        res.json(req.user);
    },

    deleteUserById: async (req, res) => {
        const { id } = req.params;
        const singleUser = await getUserByID(id);
        if (!singleUser) {
            res.status(NOT_FOUND).json({ error: 'user not found' });
            return;
        }
        await removeUserByID(id);
        res.json(`user id: ${id} deleted`);
    },

    updateUserById: async (req, res) => {
        const {
            id, name, password, email
        } = req.body;
        const singleUser = await getUserByID(id);
        if (!singleUser) {
            res.status(NOT_FOUND).json({ error: 'user not found' });
            return;
        }
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
        await updateUserInfo(id, req.body);

        res.json('User updated!');
    }
};
