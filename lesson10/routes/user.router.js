const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleware, authMiddleware } = require('../middlewares');

router.use('/:user_id',
    userMiddleware.isUserIdValid,
    userMiddleware.getUserByDynamicParam('user_id', 'params', '_id'),
    userMiddleware.isUserByIdExist);

router.get('/', userController.getAllUsers);

router.post('/',
    userMiddleware.areUserFieldsValid,
    userMiddleware.getUserByDynamicParam('email'),
    userMiddleware.isEmailExist,
    userController.createUser);

router.get('/:user_id',
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRole(),
    userController.getUserById);

router.delete('/:user_id',
    authMiddleware.checkAccessToken,
    authMiddleware.checkForUserRights,
    userController.deleteUserById);

router.patch('/:user_id',
    userMiddleware.areUserFieldsValidForUpdate,
    authMiddleware.checkAccessToken,
    authMiddleware.checkForUserRights,
    userController.updateUserById);

module.exports = router;
