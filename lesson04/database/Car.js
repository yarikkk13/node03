const { Schema, model } = require('mongoose');

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
    }
}, { timestamps: true });

module.exports = model('laptop', Car);
