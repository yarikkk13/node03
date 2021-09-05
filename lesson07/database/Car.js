const { Schema, model } = require('mongoose');
const { dbTablesEnum } = require('../configs');

const Car = new Schema({
    brand: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    model: {
        type: String,
    },
    [dbTablesEnum.USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: dbTablesEnum.USER
    }
}, { timestamps: true });

module.exports = model('car', Car);
