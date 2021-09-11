const { emailServices, jwtServices, passwordServices, } = require('../services');
const { userUtils } = require('../utils');
const {
    emailActionsEnum, mainConfigs, statusCodes, actionTypesEnum, userRolesEnum
} = require('../configs');
const { ActionTokenModel, UserModel, OauthModel } = require('../database');

module.exports = {

    registerAdmin: async (req, res, next) => {
        try {
            const userAdmin = await UserModel.create({ ...req.body, is_active: false, role: userRolesEnum.ADMIN });

            const action_token = jwtServices.generateActionToken(actionTypesEnum.FIRST_LOGIN);

            console.log(userAdmin._id);
            await ActionTokenModel.create({ action_token, user: userAdmin._id });

            const reg_link = `${mainConfigs.FRONTED_URL}/admin/update?action_token=${action_token}`;

            await emailServices.sendMail(userAdmin.email, emailActionsEnum.ACC_CREATED, { reg_link });

            const normalizedAdmin = userUtils.userNormalizator(userAdmin);

            res.status(statusCodes.CREATE).json({ action_token, user: normalizedAdmin });
            next();
        } catch (e) {
            next(e);
        }
    },

    updateAdmin: async (req, res, next) => {
        try {
            const { body: { name, password }, currentUser } = req;

            const hashPassword = await passwordServices.hash(password);

            await UserModel.findByIdAndUpdate({ _id: currentUser._id }, { password: hashPassword, name, is_active: true });

            await ActionTokenModel.deleteMany({ user: currentUser._id });

            await OauthModel.deleteMany({ user: currentUser });

            res.status(statusCodes.ACCEPTED).json('Update done successful');
            next();
        } catch (e) {
            next(e);
        }
    },

};
