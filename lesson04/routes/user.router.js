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

module.exports = router;
