const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

router.get('/', carController.getAllCars);

router.post('/', carMiddleware.areCarFieldsValid, carController.createCar);

router.get('/:car_id', carMiddleware.isCarIdValid, carMiddleware.isCarByIdExist, carController.getCarById);

router.delete('/:car_id', carMiddleware.isCarIdValid, carMiddleware.isCarByIdExist, carController.deleteCarById);

router.patch('/:car_id', carMiddleware.areCarFieldsValidForUpdate, carMiddleware.isCarByIdExist, carController.updateCarById);

module.exports = router;
