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

const tradeSchema = new mongoose.Schema({
    date:{
        type: 'string',
        required: [true, 'date is required'],
        default: moment().format('YYYY-MM-DDTHH:mm:ss'),
    },
    stockSymbol:{
        type:'string',
        required: [true, 'stockSymbol is required'],
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required: [true, 'user is required'],
    },
    position:{
        type: 'string',
        required: [true, 'position is required'],
        enum: ['Long', 'Short'],
    },
    entryPrice:{
        type: 'number',
        required: [true, 'entryPrice is required'],
        validate:[isPositive, 'entryPrice must be greater than 0']
    },
    exitPrice:{
        type: 'number',
        required: [true, 'exitPrice is required'],
        validate:[isPositive, 'exitPrice must be greater than 0']
    },
    timeEntry:{
        type: 'string',
        required: [true, 'timeEntry is required'],
    },
    timeExit:{
        type: 'string',
        required: [true, 'timeExit is required'],
    },
    isSuccess:{
        type: 'boolean',
        required: [true, 'isSuccess is required'],
    },
    profitLoss:{
        type: 'number',
        required: [true, 'profitLoss is required'],
    },
    lots:{
        type: 'number',
        required: [true, 'Lots is required'],
    },
    entryProccess:{
        type: 'string',
        enum: ['As Planned', 'Too Early', 'Too Late', 'Revenge', 'FOMO'],
        required: [true, 'entryProccess is required'],
    },
    exitProccess:{
        type: 'string',
        enum: ['Profit Target', 'Stop Loss', 'Trailing Stop', 'Manual', 'Time'],
        required: [true, 'exitProccess is required'],
    },
    tradingError:{
        type: 'string',
        enum: ['Greed', 'Sold too early', 'Held too long', 'No Error', 'Bad Entry'],
        required: [true, 'tradingError is required'],
    },
    net:{
        type: 'number',
        required: [true, 'net is required'],
    },
    createdAt: {
        type: 'date',
        default: Date.now
    },
    
    
}, options);

// TODO:check this later
function isPositive(n){
    return n > 0;
}


tradeSchema.methods = {
    // isPassword: async function(password, hashedPassword){
    //     return await bcrypt.compare(password, hashedPassword)
    // },

    // generateResetToken:async function(){
    //     const resetToken = crypto.randomBytes(32).toString('hex')
    //     this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    //     this.passwordResetExpired = Date.now() + 15 * 60 * 1000
    //     await this.save({validateBeforeSave:false})
    //     return resetToken;
    // }
};


tradeSchema.pre('save', async function(next){ 
    this.date = moment(this.date).format('YYYY-MM-DDTHH:mm:ss');
    this.stockSymbol = this.stockSymbol.toUpperCase();
    next();
});

tradeSchema.pre('validate', function(next){ 
    next();
});

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;