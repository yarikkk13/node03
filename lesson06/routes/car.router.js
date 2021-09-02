const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

router.use('/:car_id',
    carMiddleware.getCarByDynamicParam('car_id', 'params', '_id'),
    carMiddleware.isCarByIdExist);

router.get('/', carController.getAllCars);

router.post('/', carMiddleware.areCarFieldsValid, carController.createCar);

router.get('/:car_id', carMiddleware.isCarIdValid, carController.getCarById);

router.delete('/:car_id', carMiddleware.isCarIdValid, carController.deleteCarById);

router.patch('/:car_id', carMiddleware.areCarFieldsValidForUpdate, carController.updateCarById);

module.exports = router;
