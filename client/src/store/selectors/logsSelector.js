import { createSelector } from '@reduxjs/toolkit';
import moment from 'moment-timezone';
import _ from 'lodash';
import { getSelectedSymbolsSelector, getSelectedPositionSelector, getSelectedStatusSelector, getSelectedTimeFrameSelector } from './filtersSelector';

const logsSelector = (state) => state.logs;

export const getFilteresLogsSelector = (trades) => createSelector(
    [logsSelector, getSelectedSymbolsSelector, getSelectedPositionSelector, getSelectedStatusSelector, getSelectedTimeFrameSelector], (logs, selectedSymbols, selectedPosition, selectedStatus, selectedTimeFrame) => {
        const filteredTrades = trades.filter(trade => {
            const isSymbolMatch = selectedSymbols.includes(trade.stockSymbol);
            const isPositionMatch = selectedPosition !== 'All' ? selectedPosition === trade.position : true;
            const isStatusMatch = selectedStatus !== 'All' ?  trade.isSuccess === (selectedStatus === 'Success') :true;
            return isSymbolMatch && isPositionMatch && isStatusMatch;
        });
        return filteredTrades;
    })

