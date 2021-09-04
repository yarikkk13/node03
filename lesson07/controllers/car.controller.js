const { carServices } = require('../services');
const { carModel } = require('../database');
const { statusCodes } = require('../configs');

module.exports = {
    getAllCars: async (req, res, next) => {
        try {
            const allCars = await carServices.findAllCars();

            res.status(statusCodes.OK).json(allCars);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const car = await carServices.insertCar(req.body);

            res.status(statusCodes.CREATE).json(car);
        } catch (e) {
            next(e);
        }
    },

    getCarById: (req, res, next) => {
        try {
            res.status(statusCodes.OK).json(req.car);
        } catch (e) {
            next(e);
        }
    },

    deleteCarById: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            await carServices.removeCarById(car_id);

            res.status(statusCodes.NO_CONTENT).json('car deleted');
        } catch (e) {
            next(e);
        }
    },

    updateCarById: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            await carModel.findByIdAndUpdate(car_id, req.body);

            res.status(statusCodes.ACCEPTED).json('Update done successful');
        } catch (e) {
            next(e);
        }
    },
};
