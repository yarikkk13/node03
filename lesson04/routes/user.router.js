const router = require('express').Router();
const {
    getAllUser,
    createUser,
    getUserById,
    deleteUserById,
    updateUserById
} = require('../controllers/user.controller');
const { isEmailExist, isUserByIdExist } = require('../middlewares/user.middleware');

router.get('/', getAllUser);

router.post('/', isEmailExist, createUser);

router.get('/:user_id', isUserByIdExist, getUserById);

router.delete('/:user_id', deleteUserById);

router.patch('/:user_id', updateUserById);

// router.get('/', userController.getAllUsers);
//
// router.post('/', userController.createUser);
//
// router.get('/:userId', userMiddleware.userIdValidation, userController.getUserById);
//
// router.delete('/:userId', userMiddleware.userIdValidation, userController.deleteUserById);
//
// router.patch('/:userId', userMiddleware.userIdValidation, userController.updateUserById);

module.exports = router;
