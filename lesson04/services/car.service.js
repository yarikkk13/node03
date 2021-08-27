const { carModel } = require('../database');

module.exports = {
    findAll: () => carModel.find({}),

    insertUser: (user) => carModel.create(user),

    getUserById: (user_id) => carModel.findById(user_id),

    getUserByEmail: (email) => carModel.findById(email),

    removeUserById: (user_id) => carModel.findByIdAndDelete(user_id),

    updateUserInfo: (user_id, info) => carModel.findOneAndUpdate(user_id, info),

};
