const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.post('/', userMiddleware.isEmailExist, userMiddleware.isAllFieldsPresent, userController.createUser);

router.get('/:user_id', userMiddleware.isUserByIdExist, userController.getUserById);

router.delete('/:user_id', userMiddleware.isUserByIdExist, userController.deleteUserById);

router.patch('/:user_id', userMiddleware.isUserByIdExist, userController.updateUserById);

module.exports = router;
