const { CarModel } = require('../database');

module.exports = {
    findAllCars: () => CarModel.find({}),

    insertCar: (car) => CarModel.create(car),

    removeCarById: (car_id) => CarModel.findByIdAndDelete(car_id),

};
