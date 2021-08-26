const router = require('express').Router();
const {
    getAllUser,
    createUser,
    getUserById,
    deleteUserById,
    updateUserById
} = require('../controllers/user.controller');

router.get('/', getAllUser);

router.post('/', createUser);

router.get('/:id', getUserById);

router.delete('/:id', deleteUserById);

router.patch('/:id', updateUserById);

module.exports = router;
