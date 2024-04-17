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

const symbolSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required: [true, 'user is required'],
    },
    symbolsList:{
        type:['string'],
        required: [true, 'symbols is required'],
        minlength: [2, 'symbol must be at least 2 characters'],
        unique: true,
    },
}, options);


const Symbol = mongoose.model('Symbol', symbolSchema);

module.exports = Symbol;
