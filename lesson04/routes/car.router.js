const router = require('express').Router();

const {
    getAllCars,
    createCar,
    getCarById,
    deleteCarById,
    updateCarById
} = require('../controllers/car.controller');
const { isCarByIdExist, isAllFieldsPresent } = require('../middlewares/car.middleware');

router.get('/', getAllCars);

router.post('/', isAllFieldsPresent, createCar);

router.get('/:car_id', isCarByIdExist, getCarById);

router.delete('/:car_id', isCarByIdExist, deleteCarById);

router.patch('/:car_id', isCarByIdExist, updateCarById);

module.exports = router;
