const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Trade = require('../models/Trade');
const Symbol = require('../models/Symbol');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const moment = require('moment-timezone');
const validator = require('validator');
const InitialNet = require('../models/InitialNet');
const _ = require('lodash');

const createAndGetStockSymbol = async(req, stockSymbol) => {
    stockSymbol = validator.trim(stockSymbol.toUpperCase());

    let symbol = await Symbol.findOne({user:req.user._id})

    if (!symbol) {
        symbol = new Symbol({
            user:req.user._id,
            symbolsList:[stockSymbol]
        }); 
        await symbol.save();
    }
    else{
        const isSymbolExist = symbol.symbolsList.find((symbol) => symbol === stockSymbol);
        if (!isSymbolExist) {
            symbol.symbolsList.push(stockSymbol);
            await symbol.save();
        }
    }
}

const newTrade = catchAsync(async(req, res, next) =>{
    await Trade.init();

    const {stockSymbol} = req.body;

    // !There might be a logic problem here if user enters a new stock with smaller date than the last trade
    const lastTrade = await Trade.findOne({user:req.user._id}).sort({date:-1}).lean();
    const initialNet = await InitialNet.findOne({user:req.user._id});
    const net = !lastTrade ? initialNet.initial + (+req.body.profitLoss) : lastTrade.net + (+req.body.profitLoss);

    const newTrade = new Trade({
        ...req.body,
        user:req.user._id,
        net,
    });
    
    await createAndGetStockSymbol(req, stockSymbol);
    await newTrade.save();

    res.status(200).json({
        status:'Success',
        message:'New trade was successfully created'
    })
});

const getTrades = catchAsync(async(req, res, next) =>{
    const {startDate, endDate} = req.query;
    let trades = await Trade.find({
        user:req.user._id,
        date: {
            $gte: startDate,
            $lte: moment(endDate).endOf('day').format('YYYY-MM-DDTHH:mm:ss')
        },
    })
    .populate({path:'stockSymbols', select:'symbolsList'})
    .select('-__v -createdAt -stockSymbol.__v -stockSymbol.createdAt')
    .sort({date:1})
    .lean();

    res.status(200).json({
        status:'Success',
        data:trades,
    })

});

const initialNet = catchAsync(async(req, res, next) =>{
    await InitialNet.init();

    const initialNet = new InitialNet({
        ...req.body,
        user:req.user._id,
    });
    await initialNet.save();
    res.status(200).json({
        status:'Success',
        message:'Initial net was successfully created',
        data:initialNet
    })
});

const getInitialNet = catchAsync(async(req, res, next) =>{
    const initialNet = await InitialNet.findOne({user:req.user._id}).select('-_id -user -__v').lean();
    res.status(200).json({
        status:'Success',
        data:initialNet
    })
});

// TODO: this could be potentially a bad logic. (using the calculation of the "net" field in the client side)
const getCardsData = catchAsync(async(req, res, next) =>{
    const {startDate, endDate} = req.query;
    
    let trades = await Trade.find({user:req.user._id, date: {
        $gte: startDate,
        $lte: moment(endDate).endOf('day').format('YYYY-MM-DDTHH:mm:ss')
    }})
    .sort({date:1})
    .select({ _id:1, date:1, profitLoss:1, actualTarget:1, actualStop:1, isSuccess:1, desiredTarget:1, desiredStop:1, date:1, position:1, net:1})
    .lean();

    // trades = trades.filter((trade) =>moment(moment(trade.date)).isBetween(moment(startDate), moment(endDate), undefined, '[]'));
        
    res.status(200).json({
        status:'Success',
        data:trades
    })
});

const getStatsData = catchAsync(async(req, res, next) =>{

    const {startDate, endDate} = req.query;
    

    const trades = await Trade.find({
        user:req.user._id,
        date: {
            $gte: startDate,
            $lte: moment(endDate).endOf('day').format('YYYY-MM-DDTHH:mm:ss')
        },
    }).lean();

    const lots = trades.reduce((acc, trade) => acc + trade.lots, 0);
    
    const fees = lots * 3;
    const numberOfTrades = trades.length;
    const executions = trades.reduce((acc, trade) => acc + trade.executions, 0);
    const winsProbability = _.round(trades.filter((trade) => trade.isSuccess).length / trades.length, 2);
    const lossesProbability = _.round(1 - winsProbability, 2);
    const biggestWin = _.round(Math.max(...trades.filter((trade) => trade.isSuccess).map((trade) => trade.profitLoss)), 2);
    const biggestLoss = _.round(Math.min(...trades.filter((trade) => !trade.isSuccess).map((trade) => trade.profitLoss)), 2);

    const biggestWinStreak = _.max(trades.reduce((acc, trade) => {
        if (trade.isSuccess) {
            acc[acc.length - 1] += 1;
        }
        else{
            acc.push(0);
        }
        return acc;
    }, [0]));

    const biggestLossStreak = _.max(trades.reduce((acc, trade) => {
        if (!trade.isSuccess) {
            acc[acc.length - 1] += 1;
        }
        else{
            acc.push(0);
        }
        return acc;
    }, [0]));
    const groupByWeeks = _.groupBy(trades, (trade) => moment(trade.date).week());
    const bestWeek = _.max(Object.values(groupByWeeks).map((week) => _.sumBy(week, 'profitLoss')).filter((week) => week > 0));

    res.status(200).json({
        status:'Success',
        data:{
            fees,
            trades:numberOfTrades,
            executions,
            winsProbability,
            lossesProbability,
            biggestWin,
            biggestLoss,
            biggestWinStreak,
            biggestLossStreak,
            bestWeek
        }
    })
});


const getTradeById = catchAsync(async(req, res, next) =>{
    const trade = await Trade.findOne({
        user:req.user._id,
        _id:req.params.id
    })

    res.status(200).json({
        status:'Success',
        data:trade
    })

})

const deleteTradeById = catchAsync(async(req, res, next) =>{

    const initialNet = await InitialNet.findOne({user:req.user._id});
    const deletedTrade = await Trade.findOne({user:req.user._id, _id:req.params.id});
    const lastTrade = await Trade.findOne({user:req.user._id, date: {$lt: deletedTrade.date}}).sort({date:-1}).lean();
    const trades = await Trade.find({user:req.user._id, date: {$gt: deletedTrade.date}}).sort({date:1}).lean();

    let net = lastTrade ? lastTrade.net : initialNet.initial;
    // ! this has a performance problem. i need to find a better way to do this
    for (let i = 0; i < trades.length; i++) {
        net += trades[i].profitLoss;
        await Trade.findByIdAndUpdate(trades[i]._id, {net});
    }
    
    await deletedTrade.remove();

    res.status(200).json({
        status:'Success',
        message:'Trade was successfully deleted',
    })
})

module.exports = {
    newTrade,
    getTrades,
    initialNet,
    getCardsData,
    getStatsData,
    getTradeById,
    getInitialNet,
    deleteTradeById
}


// rename stocksBoought to stocksQuantity


