const { CarModel } = require('../database');

module.exports = {
    findAllCars: async (query = {}) => {
        const {
            size = 5,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;
        const skip = (page - 1) * size;
        const orderBy = order === 'asc' ? -1 : 1;
        const sort = { [sortBy]: orderBy };

        const filterObject = {};
        const yearFilter = {};

        Object.keys(filters).forEach((key) => {
            switch (key) {
                case 'model':
                    if (filters.model.length) {
                        const modelsArr = filters.model.split(';');
                        filterObject.model = { $in: modelsArr };
                    }
                    break;
                case 'brand':
                    filterObject.brand = { $regex: `^${filters.brand}`, $options: 'gi' };
                    break;
                case 'year.gte':
                    Object.assign(yearFilter, { $gte: +filters['year.gte'] });
                    break;
                case 'year.lte':
                    Object.assign(yearFilter, { $lte: +filters['year.lte'] });
                    break;
            }
        });

        if (Object.keys(yearFilter).length) {
            filterObject.year = yearFilter;
        }

        const cars = await CarModel
            .find(filterObject)
            .limit(+size)
            .skip(skip)
            .sort(sort);

        const items = await CarModel.countDocuments(filterObject);

        return {
            data: cars,
            page,
            size: +size,
            items,
            pages: Math.ceil(items / size)
        };
    },

    insertCar: (car) => CarModel.create(car),

    removeCarById: (car_id) => CarModel.findByIdAndDelete(car_id),

};
