const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const moment = require('moment-timezone');

const options = {
    optimisticConcurrency:true,
    selectPopulatedPaths:true,
    toJSON: {
        versionKey: false,
    }
}

const userSchema = new mongoose.Schema({
    name:{
        type: 'string',
        required: [true, 'Name is required'],
        minlength:[2, 'firstName must be at least 2 characters'],
        maxLength:[30, 'firstName must be at most 30 characters']
    },
    // phone:{
    //     type: 'string',
    //     required: [true, 'phone is required'],
    //     minlength:[10, 'phone must be 10 characters'],
    //     maxLength:[10, 'phone must be 10 characters'],
    //     validate:[isValidPhone, 'Invalid phone'],
    //     select:false,
    // },
    email:{
        type:'string',
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
        maxLength:[50, 'Email must be at most 50 characters'],
        validate:[isValidEmail, 'Invalid Email']
    },
    password:{
        type:'string',
        required: [true, 'Password is required'],
        minlength:[6, 'Password must be at least 6 characters'],
        maxLength:[50, 'Password must be at most 50 characters'],
        validate: [isStrongPassword, 'Password must contain 6 characters with at least one letter']
    },
    passwordConfirm:{
        type:'string',
        required: [true, 'Password is required'],
        minlength:[6, 'Password confirmation must be at least 6 characters'],
        maxLength:[50, 'Password confirmation must be at most 50 characters'],
        validate:[isEqualToPassword, 'Invalid Password confiramtion']
    },
    createdAt: {
        type: 'date',
        default: moment().format('YYYY-MM-DDTHH:mm:ss'),
    },
    passwordResetToken:{
        type:'string',
    },
    passwordResetExpired:{
        type:Date
    }
    
}, options);

function isValidPhone(phone){
    return validator.isMobilePhone(phone, ['en-US', 'en-IN', 'he-IL']);
}


function isValidEmail(email){
    return validator.isEmail(email);
}

function isEqualToPassword(passwordConfirm){
    return this.password === passwordConfirm;
}

function isStrongPassword(password){
    return validator.isStrongPassword(password, {minLength:6,minSymbols:0,minLowercase:0,minUppercase:0});
}


userSchema.methods = {
    isPassword: async function(password, hashedPassword){
        return await bcrypt.compare(password, hashedPassword)
    },

    generateResetToken:async function(){
        const resetToken = crypto.randomBytes(32).toString('hex')
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.passwordResetExpired = Date.now() + 15 * 60 * 1000
        await this.save({validateBeforeSave:false})
        return resetToken;
    }
};


userSchema.pre('save', async function(next){ 
    if(this.isModified('password')){
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        this.passwordConfirm = undefined;
    }

    if(this.isModified('phone')){
        const hashedPhone = await bcrypt.hash(this.phone, 12);
        this.phone = hashedPhone;
    }
    next();
});

userSchema.pre('validate', function(next){ 
    this.name = validator.trim(this.name);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;