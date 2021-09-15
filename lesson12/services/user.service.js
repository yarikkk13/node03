const { UserModel } = require('../database');

module.exports = {
    findAll: async (query = {}) => {
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

        const filterObject = { is_deleted: false };

        Object.keys(filters).forEach((key) => {
            switch (key) {
                case 'role':
                    if (filters.role.length) {
                        const rolesArr = filters.role.split(';');
                        filterObject.role = { $in: rolesArr };
                    }
                    break;
                case 'email':
                    filterObject.email = filters.email;
                    break;
                case 'name':
                    filterObject.name = { $regex: `^${filters.name}`, $options: 'gi' };
                    break;
            }
        });

        const users = await UserModel
            .find(filterObject)
            .limit(+size)
            .skip(skip)
            .sort(sort)
            .select('-password -__v');

        const items = await UserModel.countDocuments(filterObject);

        return {
            data: users,
            page,
            size: +size,
            items,
            pages: Math.ceil(items / size)
        };
    },

    insertUser: (user) => UserModel.create(user),

    removeUserById: (user_id) => UserModel.findByIdAndDelete(user_id),

};
