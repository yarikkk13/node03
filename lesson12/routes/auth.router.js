const router = require('express').Router();

const { authController } = require('../controllers');
const { actionTypesEnum } = require('../configs');
const { userMiddleware, authMiddleware } = require('../middlewares');

router.post('/register', userMiddleware.areUserFieldsValid, userMiddleware.isEmailExist, authController.register);

router.post('/signin', userMiddleware.isSignInValid, userMiddleware.isUserByEmailExist, authController.signIn);

router.post(
    '/',
    userMiddleware.getUserByDynamicParam('email'),
    userMiddleware.isUserByIdExist,
    authController.login
);

router.post('/logout', authMiddleware.checkAccessToken, authController.logout);

router.post('/superlogout', authMiddleware.checkAccessToken, authController.superlogout);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

router.post('/password/forgot', userMiddleware.isUserByEmailExist, authController.sendMailForgotPassword);

router.post('/password/forgot/set',
    authMiddleware.isPasswordValid,
    authMiddleware.checkActionToken(actionTypesEnum.FORGOT_PASS),
    authController.setUserPassword);

module.exports = router;
