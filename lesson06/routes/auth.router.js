const router = require('express').Router();

const { authController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.post('/register', userMiddleware.areUserFieldsValid, userMiddleware.isEmailExist, authController.register);

router.post('/signin', userMiddleware.isSignInValid, userMiddleware.isUserByEmailExist, authController.signIn);

module.exports = router;
