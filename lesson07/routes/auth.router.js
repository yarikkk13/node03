const router = require('express').Router();

const { authController } = require('../controllers');
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

// router.post('/refresh', authMiddlewares.checkRefreshToken, authController.refreshToken);

module.exports = router;
