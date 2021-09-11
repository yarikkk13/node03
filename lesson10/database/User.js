const { Schema, model } = require('mongoose');

const { userRolesEnum, dbTablesEnum } = require('../configs');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    is_active: {
        type: Boolean,
        default: true,
        required: true,
        trim: true,
    },
    is_deleted: {
        type: Boolean,
        default: false,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        default: userRolesEnum.USER,
        enum: Object.values(userRolesEnum)
    }
}, { timestamps: true });

module.exports = model(dbTablesEnum.USER, userSchema);
