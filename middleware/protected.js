const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const protected = catchAsync(async(req, res, next) =>{
    
    let token = req.get('Authorization');

    if (!token) {
        return next(new AppError('Please login to get access', 'Failed', 401));
    }

    token = token.split(' ')[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); 

    if(!decoded){
        return next(new AppError('Invalid token', 'Failed', 401));
    }

    const {userId} = decoded;
    
    const user = await User.findOne({_id:userId});
    if (!user) {
        return next(new AppError('User with this token is no longer exists', 'Failed', 401));    
    }

    req.user = user;
    next();
});


module.exports = protected;