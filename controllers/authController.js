const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

const generateToken = (userId, userEmail) =>{
    const jwtOptions = {
        expiresIn:process.env.JWT_EXPIRE  * 60 * 60  //* 2 hours
    };
    return jwt.sign({userId, userEmail}, process.env.JWT_SECRET, jwtOptions)
}

const register = catchAsync(async(req, res, next) =>{

    console.log('request arrived');
    await User.init();

    
    const user = new User({
        ...req.body
    });

    await user.save();

    user.password = undefined;
    user.phone = undefined;

    const token = generateToken(user.id, user.email);

    res.status(201).json({
        status:'Success',
        message:'User was successfully created',
        user,
        token,
        isNew:true
    })
});


const login = catchAsync(async(req, res, next) =>{
    const {email, password} = req.body;

    if(!email || !password){
        return next(new AppError('Please provide both email and password', 'Failed', 400))
    }

    const user = await User.findOne({email});

    if(!user || ! await user.isPassword(password, user.password)){
        return next(new AppError('Invalid email or password', 'Failed', 400));
    }

    user.password = undefined;
    const token = generateToken(user._id, user.email);

    res.status(200).json({
        status:'Success',
        message:'Successfully login',
        user,
        token,
        isNew:false
    })
});


const forgotPassword = catchAsync(async(req, res, next) =>{
    const {email} = req.body;
    if (!email) {
        return next(new AppError('Please provide an email', 'Failed', 400));
    }
    const user = await User.findOne({email});

    if (!user) {
        return next(new AppError('Email was not found', 'Failed', 401));
    }

    const resetToken = await user.generateResetToken();
    const resetUrl = `${req.get('Origin')}/resetPassword/${resetToken}`;

    try {
        await sendEmail(email, resetUrl);
        res.status(200).json({
            status:'Success',
            message:'Please check your email for password reset',
        });
    } catch(err){
        user.passwordRestToken = undefined;
        user.passwordRestExpired = undefined;
        await user.save({validateBeforeSave:false});
        return next(new AppError('An error occured while sending the email', 'Failed', 500));//*500=server error
    }
});

const resetPassword = catchAsync(async(req, res, next) =>{
    const {resetToken} = req.params;
    const {password, passwordConfirm} = req.body;

    if (!resetToken) {
        return next(new AppError('Unauthorized', 'Failed', 401));
    }
    if (!password || !passwordConfirm) {
        return next(new AppError('Please provide password and password confirmation', 'Failed', 401));
    }
    const hashToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const user = await User.findOne({
        passwordResetToken:hashToken,
        passwordResetExpired:{$gt:Date.now()}
    });

    if (!user) {
        return next(new AppError('Token is invalid or has expired','Failed', 400));
    }
    user.password = password;
    user.passwordConfirm = passwordConfirm;
    user.passwordResetExpired = undefined;
    user.passwordResetToken = undefined;

    await user.save();
    
    res.status(200).json({
        status: 'Success',
        message:'Password was successfully changed'
    })
});


module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword 
}

