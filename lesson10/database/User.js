const { Schema, model } = require('mongoose');

const { userRolesEnum, dbTablesEnum } = require('../configs');
// const { passwordServices } = require('../services');

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
    avatar: {
        type: String
    },
    role: {
        type: String,
        default: userRolesEnum.USER,
        enum: Object.values(userRolesEnum)
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

userSchema.virtual('fullName').get(function() {
    return `${this.name} ${this.email}`;
});

// userSchema.methods = { // for single record // THIS - RECORD
//     validatePassword(password) {
//         return passwordServices.compare(password, this.password);
//     }
// };

// Accessing non-existent property 'passwordServices' of module exports inside circular dependency
// userSchema.statics = { // for schema // THIS - SCHEMA
//     async createWithHashPassword(userObject) {
//         const hashPassword = await passwordServices.hash(userObject.password);
//
//         return this.create({ ...userObject, password: hashPassword });
//     }
// };

module.exports = model(dbTablesEnum.USER, userSchema);
