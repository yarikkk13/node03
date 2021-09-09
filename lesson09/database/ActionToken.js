const { Schema, model } = require('mongoose');

const { dbTablesEnum } = require('../configs');

const ActionTokenSchema = new Schema({
    access_token: {
        type: String,
        required: true
    },
    [dbTablesEnum.USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: dbTablesEnum.USER
    },
}, { timestamps: true });

module.exports = model(dbTablesEnum.ACTION_TOKEN, ActionTokenSchema);
