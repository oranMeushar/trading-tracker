const mongoose = require('mongoose');
const validator = require('validator');
const moment = require('moment-timezone');

const options = {
    optimisticConcurrency:true,
    selectPopulatedPaths:true,
    toJSON: {
        versionKey: false,
    }
}

const initialNetSchema = new mongoose.Schema({
    initial:{
        type: 'number',
        min: [0, 'initialNet must be greater than 0'],
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required: [true, 'user is required'],
    },
    date:{
        type: 'string',
        required: [true, 'date is required'],
        default: moment().format('YYYY-MM-DDTHH:mm:ss'),
    },
}, options);

const InitialNet = mongoose.model('InitialNet', initialNetSchema);

module.exports = InitialNet;