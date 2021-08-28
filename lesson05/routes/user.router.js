const router = require('express').Router();

const {
    getAllUsers,
    createUser,
    getUserById,
    deleteUserById,
    updateUserById
} = require('../controllers/user.controller');
const { isEmailExist, isUserByIdExist, isAllFieldsPresent } = require('../middlewares/user.middleware');

router.get('/', getAllUsers);

router.post('/', isEmailExist, isAllFieldsPresent, createUser);

router.get('/:user_id', isUserByIdExist, getUserById);

router.delete('/:user_id', isUserByIdExist, deleteUserById);

router.patch('/:user_id', isUserByIdExist, updateUserById);

module.exports = router;
