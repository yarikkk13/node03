const path = require('path');

const usersPath = path.join(__dirname, '..', 'database', 'users.json');
const { readFile, writeFile } = require('../helpers/async');

const getAllUsers = async () => {
    const allUsers = await readFile(usersPath);
    return JSON.parse(String(allUsers));
};

module.exports = {
    findAll: () => getAllUsers(),

    insertUser: async (user) => {
        const db = await getAllUsers();

        db.push({ id: db.length, ...user });

        await writeFile(usersPath, JSON.stringify(db));
    },

    getUserByID: async (id) => {
        const allUsers = await getAllUsers();
        return allUsers.find((user) => String(user.id) === id);
    },

    getUserByEmail: async (email) => {
        const allUsers = await getAllUsers();
        return allUsers.find((user) => String(user.email) === email);
    },

    removeUserByID: async (id) => {
        const allUsers = await getAllUsers();
        const filterUser = allUsers.filter((user) => String(user.id) !== id);

        await writeFile(usersPath, JSON.stringify(filterUser));
        return filterUser;
    },

    updateUserInfo: async (id, info) => {
        const allUsers = await getAllUsers();
        const userInfo = allUsers.find((user) => String(user.id) === id);
        allUsers[id] = { ...userInfo, ...info };

        await writeFile(usersPath, JSON.stringify(allUsers));
    }
};
