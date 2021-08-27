const { userModel } = require('../database');

module.exports = {
    findAll: () => userModel.find({}),

    insertUser: (user) => userModel.create(user),

    getUserById: (user_id) => userModel.findById(user_id),

    getUserByEmail: (email) => userModel.findById(email),

    removeUserById: (user_id) => userModel.findByIdAndDelete(user_id),

    updateUserInfo: (user_id, info) => userModel.findOneAndUpdate(user_id, info),

};
