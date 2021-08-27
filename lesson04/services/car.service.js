const { carModel } = require('../database');

module.exports = {
    findAllCars: () => carModel.find({}),

    insertCar: (car) => carModel.create(car),

    removeCarById: (car_id) => carModel.findByIdAndDelete(car_id),

};
