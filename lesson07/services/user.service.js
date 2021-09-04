const { UserModel } = require('../database');

module.exports = {
    findAll: () => UserModel.find({}),

    insertUser: (user) => UserModel.create(user),

    removeUserById: (user_id) => UserModel.findByIdAndDelete(user_id),

};
