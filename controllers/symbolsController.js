const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Symbol = require('../models/Symbol');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const moment = require('moment-timezone');
const validator = require('validator');
const _ = require('lodash');

const getAllSymbols = catchAsync(async(req, res, next) =>{
    const symbol = await Symbol.findOne({user:req.user._id});
    
    const symbolsList = symbol.symbolsList.map((symbol, idx) => {
        return{
            id: idx,
            name: symbol,
        }
    })

    res.status(200).json({
        status:'Success',
        data: symbolsList
    })
});


module.exports = {
    getAllSymbols
}
