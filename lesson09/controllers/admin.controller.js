const { emailServices, jwtServices, passwordServices, } = require('../services');
const { userUtils } = require('../utils');
const { emailActionsEnum, mainConfigs, statusCodes, } = require('../configs');
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

            await emailServices.sendMail(current_user.email, emailActionsEnum.ACC_CREATED, { reg_link });

            const normalizedAdmin = userUtils.userNormalizator(userAdmin);

            res.status(statusCodes.CREATE).json({ action_token, user: normalizedAdmin });
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

            await authController.superlogout(current_user);

            res.status(statusCodes.ACCEPTED).json('Update done successful');
            next();
        } catch (e) {
            next(e);
        }
    },

};
