const router = require('express').Router();

const { adminController } = require('../controllers');
const { userRolesEnum, actionTypesEnum } = require('../configs');
const { userMiddleware, authMiddleware } = require('../middlewares');

router.post('/register',
    userMiddleware.areUserFieldsValid,
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRole([userRolesEnum.ADMIN]),
    userMiddleware.getUserByDynamicParam('email'),
    userMiddleware.isEmailExist,
    adminController.registerAdmin);

router.post('/update',
    userMiddleware.areUserFieldsValid,
    authMiddleware.checkActionToken(actionTypesEnum.FIRST_LOGIN),
    adminController.updateAdmin);

module.exports = router;
