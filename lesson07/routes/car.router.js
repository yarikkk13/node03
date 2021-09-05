const router = require('express').Router();

const { carController } = require('../controllers');
const { carMiddleware, authMiddleware } = require('../middlewares');

router.use('/:car_id',
    carMiddleware.isCarIdValid,
    carMiddleware.getCarByDynamicParam('car_id', 'params', '_id'),
    carMiddleware.isCarByIdExist);

router.get('/', carController.getAllCars);

router.post('/',
    carMiddleware.areCarFieldsValid,
    authMiddleware.checkAccessToken,
    carController.createCar);

router.get('/:car_id', carController.getCarById);

router.delete('/:car_id', carController.deleteCarById);

router.patch('/:car_id', carMiddleware.areCarFieldsValidForUpdate, carController.updateCarById);

module.exports = router;
