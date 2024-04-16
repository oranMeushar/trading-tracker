import { createSelector } from '@reduxjs/toolkit';
import moment from 'moment-timezone';
import _ from 'lodash';
import {getSelectedPositionSelector, getSelectedStatusSelector, getSelectedSymbolsSelector, getSelectedTimeFrameSelector } from './filtersSelector';

const tradesSelector = state => state.trades;

export const getTradesSelector = createSelector(
    [tradesSelector], (trades) => {
        return trades.tradesList;
})

export const getCardsSelector = createSelector(
    [tradesSelector], (trades) => {
        return trades.cards;
})

export const getStatsSelector = createSelector(
    [tradesSelector], (trades) => {
        return trades.stats;
})

export const getSymbolsSelector = createSelector(
    [tradesSelector], (trades) => {
        return trades.symbols;
})

export const getInitialNetSelector = createSelector(
    [tradesSelector], (trades) => {
        return trades.initialNet;
})

export const getAccSelector = createSelector(
    [getCardsSelector], (cards) => {
        let res = {
            cards:[],
            totalNet: 0
        }

        if(!cards.length) return {res};

        const totalNet = cards[cards.length - 1]?.net;

        res = {
            cards:cards.map((item, index) => ({ ...item, date:item.date, y:item.net})) || [],
            totalNet: totalNet || 0
        }
        return {res};
})

export const getReturnsSelector = createSelector(
    [getTradesSelector, getCardsSelector, getInitialNetSelector], (tradesList, cards, initialNet) => {
        let res = {
            negativeAccNet:[],
            positiveAccNet:[],
            initialDate: null,
            profitFactor: 0,
            avgReturn: 0
        };

        if(!cards.length || !tradesList.length || _.isEmpty(initialNet)) return {res};

        const negativeAccNet = cards
        .filter(item => item.profitLoss < 0)
        .map( item => ({label:moment(item.date).format('MMM D'), y:Math.abs(item.profitLoss), cards:item.net}))

        const positiveAccNet = cards
        .filter(item => item.profitLoss >= 0)
        .map( item => ({label:moment(item.date).format('MMM D'), y:item.profitLoss, cards:item.net}))

        const avgReturn = cards.reduce((acc, next) => acc + next.profitLoss, 0) / (cards.length);

        let profitFactor = cards[cards.length - 1].net / initialNet.initial;
        profitFactor = profitFactor > 1 ? profitFactor : -(1/profitFactor);

        res = {
            negativeAccNet,
            positiveAccNet,
            initialDate: cards[0].date,
            profitFactor,
            avgReturn
        }
        return {res};
    }
)


export const getWinLostChartSelector = createSelector(
    [tradesSelector, getCardsSelector], (trades, cards) => {
        let res = {
            winsPercantage:0,
            lossesPercantage:0,
            initialDate: null,
            wins:[],
            losses:[],
        };

        if(!cards.length) return {res};

        const winsPercantage = cards.filter(item => item.isSuccess).length / (cards.length) * 100;
        const lossesPercantage = cards.filter(item => !item.isSuccess).length / (cards.length) * 100;
        
        res = {
            winsPercantage,
            lossesPercantage,
            wins: cards.filter(item => item.isSuccess),
            losses: cards.filter(item => !item.isSuccess),
            initialDate: cards[0].date,
        }
        return {res};
    }
)

export const getDailyChartSelector = createSelector(
    [ getTradesSelector,getSelectedTimeFrameSelector, getSelectedStatusSelector, getSelectedPositionSelector, getInitialNetSelector, getSelectedSymbolsSelector],
    (tradesList, selectedTimeFrame, selectedStatus, selectedPosition, initialNet, selectedSymbols) => {

        let res = {
            cards:[],
            dailyTrades:[],
            avgReturn:[]
        };
        if(!tradesList.length || _.isEmpty(initialNet)) return {res};

        
        let filteredTrades = tradesList
        .map(item => ({...item}))
        .filter(trade => selectedSymbols.includes(trade.stockSymbol));
        
        selectedStatus !== 'All' && (filteredTrades = filteredTrades.filter(item => item.isSuccess === (selectedStatus === 'Success')))

        selectedPosition !== 'All' && (filteredTrades = filteredTrades.filter(item => item.position === selectedPosition))

        let sum = initialNet.initial;
        const cards = filteredTrades.map((item, index) => {
            sum += item.profitLoss;
            return {
                date:item.date,
                y:sum,
            }
        })

        const avgReturn = cards.map((item, index) => ({date:item.date, y:(item.y - initialNet.initial) / (index + 1)}))
        const dailyTrades = filteredTrades.map((item, index) => {
            return {
                date:item.date,
                y:Math.abs(item.profitLoss),
                isSuccess:item.isSuccess,
                symbol:item.symbol,
                color: item.isSuccess 
                ? ({linearGradient: {x1: 0,x2: 0,y1: 0,y2: 1},stops: [[0, '#3dee90'],[1, '#00bd96']]})
                : ({linearGradient: {x1: 0,x2: 0,y1: 0,y2: 1},stops: [[0, '#ff3b3b'],[1, '#ff8282']]}),
                position: item.position,
            }
        })

        res = { cards, dailyTrades, avgReturn }

        return {res};
})


export const getPerformancePerCompanySelector = createSelector(
    [ getTradesSelector,getSelectedTimeFrameSelector, getSelectedStatusSelector, getSelectedPositionSelector, getSelectedSymbolsSelector],
    (tradesList, selectedTimeFrame, selectedStatus, selectedPosition, selectedSymbols) => {

        let res = {
            allProfits:[],
            allLosses:[],
            categories:[],
        };
        if(!tradesList.length) return {res};

        let filteredTrades = tradesList.map(item => ({...item})).filter(trade => selectedSymbols.includes(trade.stockSymbol));

        selectedStatus !== 'All' && (filteredTrades = filteredTrades.filter(item => item.isSuccess === (selectedStatus === 'Success')))
        selectedPosition !== 'All' && (filteredTrades = filteredTrades.filter(item => item.position === selectedPosition))

        const groupedCompanies = _.groupBy(filteredTrades, 'stockSymbol');

        const companiesProfitsAndLosses = Object.keys(groupedCompanies).map(company => {
            const profits = groupedCompanies[company].filter(item => item.isSuccess).reduce((acc, next) => acc + next.profitLoss, 0);
            const losses = groupedCompanies[company].filter(item => !item.isSuccess).reduce((acc, next) => acc + Math.abs(next.profitLoss), 0);
            return {
                name:company,
                profits,
                losses
            }
        })

        const allProfits = companiesProfitsAndLosses.map(item => item.profits);
        const allLosses = companiesProfitsAndLosses.map(item => item.losses);
        const categories = companiesProfitsAndLosses.map(item => item.name);

        res = {
            allProfits,
            allLosses,
            categories,
        }

        return {res};

})

export const getTradingPerformance = (type) => createSelector(
    [getTradesSelector, getSelectedSymbolsSelector, getSelectedPositionSelector], (tradesList, selectedSymbols, selectedPosition)=>{

        let res = {
            success:[],
            failure:[],
            categories:[]
        };
        if(!tradesList.length) return {res};

        let filteredTrades = tradesList.map(item => ({...item})).filter(trade => selectedSymbols.includes(trade.stockSymbol));

        selectedPosition !== 'All' && (filteredTrades = filteredTrades.filter(item => item.position === selectedPosition))

        _.chain(filteredTrades).groupBy(type).mapValues((group, key) =>{

            res.categories.push(key);

            const successTrades = group.filter(trade => trade.isSuccess);
            const failedTrades = group.filter(trade => !trade.isSuccess);
            
            const totalLotsSuccess = successTrades.reduce((prev, next) => prev + next.lots, 0);
            const totalProfitLossSuccess = successTrades.reduce((prev, next) => prev + next.profitLoss, 0);
            const countSuccess = successTrades.length

            res.success.push({y:countSuccess, lots:totalLotsSuccess, totalProfit:totalProfitLossSuccess, status:countSuccess > 1 ? 'Wins' : 'Win' })

            const totalLotsFail = failedTrades.reduce((prev, next) => prev + next.lots, 0);
            const totalProfitLossFail = failedTrades.reduce((prev, next) => prev + next.profitLoss, 0);
            const countFail = failedTrades.length;

            res.failure.push({y:countFail, lots:totalLotsFail, totalProfit:totalProfitLossFail, status:countFail > 1 ? 'Losses' : 'Loss'})
        }).value()

        return { res }
    }
)

export const getPerformanceByHour = createSelector(
    [getTradesSelector, getSelectedSymbolsSelector, getSelectedPositionSelector], (tradesList, selectedSymbols, selectedPosition)=>{
        
        const roundTimeEntry = (trade) => trade.timeEntry.split(':')[0]

        let res = {
            trades:Array.from({length:24}, (_, i) => ({y:0, lots:0, color:'gray', time:i >= 10 ? i+'' : `0${i}`})),
            categories:[]
        };
        if(!tradesList.length) return {res};

        let filteredTrades = tradesList
        .map(item => ({...item}))
        .filter(trade => selectedSymbols.includes(trade.stockSymbol));

        selectedPosition !== 'All' && (filteredTrades = filteredTrades.filter(item => item.position === selectedPosition))
        
        const groupedByTime = _.groupBy(filteredTrades, trade => roundTimeEntry(trade))

        let data = Object.entries(groupedByTime).map(([key, trades]) => {
            const sum = trades.reduce((prev, trade) => prev + trade.profitLoss, 0);
            const lots = trades.reduce((prev, trade) => prev + trade.lots, 0);
            return {y: sum, lots, time:key}

        });
        
        const categories = Array.from({length:24}, (_, i) => i >= 10 ? i+'' : `0${i}`);

        res.trades = res.trades.map(tradeHour =>{
            const found = data.find(v => v.time === tradeHour.time)

            return found ? {
                ...found,
                color: found.y > 0 
                ? ({linearGradient: {x1: 0,x2: 0,y1: 0,y2: 1},stops: [[0, '#3dee90'],[1, '#00bd96']]})
                : ({linearGradient: {x1: 0,x2: 0,y1: 0,y2: 1},stops: [[0, '#ff3b3b'],[1, '#ff8282']]})
            } : tradeHour

        })
        res.trades = _.orderBy(res.trades, ['time'], ['asc']);
        res.categories = categories;
        return { res }
    }
)