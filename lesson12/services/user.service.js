const { UserModel } = require('../database');

module.exports = {
    findAll: async (query = {}) => {
        const {
            size = 20,
            page = 1,
            sortBy = 'createdAt',
            order = 'asc',
            ...filters
        } = query;
        const skip = (page - 1) * size;
        const orderBy = order === 'asc' ? -1 : 1;
        const sort = { [sortBy]: orderBy };

        const filterObject = {};
        const ageFilter = {};

        Object.keys(filters).forEach((key) => {
            switch (key) {
                case 'role':
                    const rolesArr = filters.role.split(';');
                    filterObject.role = { $in: rolesArr };
                    break;
                case 'email':
                    filterObject.email = filters.email;
                    break;
                case 'name':
                    filterObject.name = { $regex: `^${filters.name}`, $options: 'gi' };
                    break;
                case 'age.gte':
                    Object.assign(ageFilter, { $gte: +filters['age.gte'] });
                    break;
                case 'age.lte':
                    Object.assign(ageFilter, { $lte: +filters['age.lte'] });
                    break;
            }
        });

        if (Object.keys(ageFilter).length) {
            filterObject.age = ageFilter;
        }

        console.log('______________________________');
        console.log(filterObject);
        console.log('______________________________');

        const users = await UserModel
            .find(filterObject)
            .limit(+size)
            .skip(skip)
            .sort(sort)
            .select('-password -__v');

        const count = await UserModel.countDocuments(filterObject);

        return {
            data: users,
            page,
            limit: +size,
            count,
            pageCount: Math.ceil(count / size)
        };
    },

    insertUser: (user) => UserModel.create(user),

    removeUserById: (user_id) => UserModel.findByIdAndDelete(user_id),

};
