const router = require('express').Router();

const { adminController } = require('../controllers');
const { userRolesEnum } = require('../configs');
const { userMiddleware, authMiddleware } = require('../middlewares');

router.post('/register',
    userMiddleware.areUserFieldsValid,
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRole([userRolesEnum.ADMIN]),
    userMiddleware.getUserByDynamicParam('email'),
    userMiddleware.isUserByIdExist,
    adminController.registerAdmin);

router.post('/update',
    authMiddleware.isPasswordValid,
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRole([userRolesEnum.ADMIN]),
    adminController.setAdminData);

module.exports = router;
