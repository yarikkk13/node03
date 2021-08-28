const { userModel } = require('../database');

module.exports = {
    findAll: () => userModel.find({}),

    insertUser: (user) => userModel.create(user),

    removeUserById: (user_id) => userModel.findByIdAndDelete(user_id),

};
