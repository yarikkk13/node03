const { carServices } = require('../services');
const { carModel } = require('../database');
const { CREATE, NO_CONTENT, ACCEPTED } = require('../configs/status.codes.enum');

module.exports = {
    getAllCars: async (req, res, next) => {
        try {
            const allCars = await carServices.findAllCars();

            res.json(allCars);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const car = await carServices.insertCar(req.body);

            res.status(CREATE).json(car);
        } catch (e) {
            next(e);
        }
    },

    getCarById: (req, res, next) => {
        try {
            res.json(req.car);
        } catch (e) {
            next(e);
        }
    },

    deleteCarById: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            await carServices.removeCarById(car_id);

            res.status(NO_CONTENT).json('car deleted');
        } catch (e) {
            next(e);
        }
    },

    updateCarById: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            await carModel.findByIdAndUpdate(car_id, req.body);

            res.status(ACCEPTED).json('Update done successful');
        } catch (e) {
            next(e);
        }
    },
};
