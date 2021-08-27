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

router.get('/:car_id', isUserByIdExist, getUserById);

router.delete('/:car_id', isUserByIdExist, deleteUserById);

router.patch('/:car_id', isUserByIdExist, updateUserById);

module.exports = router;
