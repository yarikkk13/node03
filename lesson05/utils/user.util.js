module.exports = {
    userNormalizator: (userToNormalize) => {
        const fieldToRemove = [
            'password',
            '__v'
        ];

        userToNormalize = userToNormalize.toJSON();

        fieldToRemove.forEach((field) => {
            delete userToNormalize[field];
        });

        return userToNormalize;
    },
};
