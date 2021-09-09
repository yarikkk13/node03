const { emailServices, jwtServices, passwordServices, } = require('../services');
const { userUtils } = require('../utils');
const { emailActionsEnum, mainConfigs, } = require('../configs');
const { ActionTokenModel, UserModel } = require('../database');
const { authController } = require('./index');

module.exports = {

    registerAdmin: async (req, res, next) => {
        try {
            const { current_user } = req;

            const userAdmin = await UserModel.create({ ...req.body, is_active: false });

            const action_token = jwtServices.generateActionToken();

            await ActionTokenModel.create({ action_token, user: current_user._id });

            const reg_link = `${mainConfigs.FRONTED_URL}/admin/update?action_token=${action_token}`;

            emailServices.sendMail(current_user.email, emailActionsEnum.ACC_CREATED, { reg_link });

            res.json({ action_token, user: userUtils.userNormalizator(userAdmin) });
            next();
        } catch (e) {
            next(e);
        }
    },

    updateAdmin: async (req, res, next) => {
        try {
            const { body: { name, password }, current_user } = req;

            const hashPassword = await passwordServices.hash(password);

            await UserModel.findByIdAndUpdate({ _id: current_user._id }, { password: hashPassword, name, is_active: true });

            await ActionTokenModel.deleteMany({ user: current_user._id });

            authController.superlogout(current_user);

            res.json('Data set.');
            next();
        } catch (e) {
            next(e);
        }
    },

};
