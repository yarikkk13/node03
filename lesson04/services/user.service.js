const User = require('../database');

module.exports = {
    findAll: () => User.find({}),

    insertUser: (user) => User.create(user),

    getUserById: (user_id) => User.findById(user_id),

    getUserByEmail: (email) => User.findById(email),

    removeUserById: (user_id) => User.findByIdAndDelete(user_id),

    updateUserInfo: (user_id, info) => User.findOneAndUpdate(user_id, info),

};
