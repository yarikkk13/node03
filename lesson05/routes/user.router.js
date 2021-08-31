const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.post('/',
    userMiddleware.areUserFieldsValid,
    userMiddleware.isEmailExist,
    userController.createUser);

router.get('/:user_id',
    userMiddleware.isUserIdValid,
    userMiddleware.isUserByIdExist,
    userController.getUserById);

router.delete('/:user_id',
    userMiddleware.isUserIdValid,
    userMiddleware.isUserByIdExist,
    userController.deleteUserById);

router.patch('/:user_id',
    userMiddleware.areUserFieldsValidForUpdate,
    userMiddleware.isUserByIdExist,
    userController.updateUserById);

module.exports = router;
