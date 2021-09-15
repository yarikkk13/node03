const { carServices } = require('../services');
const { CarModel } = require('../database');
const { statusCodes } = require('../configs');

module.exports = {
    getAllCars: async (req, res, next) => {
        try {
            const { size, page } = req.query;

            const allCars = await CarModel
                .find().limit(+size)
                .skip((page - 1) * size);

            res.status(statusCodes.OK).json(allCars);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const { currentUser } = req;

            const car = await carServices.insertCar({ ...req.body, user: currentUser._id });

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

            await CarModel.findByIdAndUpdate(car_id, req.body);

            res.status(statusCodes.ACCEPTED).json('Update done successful');
        } catch (e) {
            next(e);
        }
    },
};
