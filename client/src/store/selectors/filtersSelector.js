import { createSelector } from '@reduxjs/toolkit';
import moment from 'moment-timezone';
import _ from 'lodash';


const filtersSelector = state => state.filters;

export const getSelectedDateSelector = createSelector(
    [filtersSelector], (filters) => {
        return filters.selectedDate;
    }
) 

export const getSelectedSymbolsSelector = createSelector(
    [filtersSelector], (filters) => {
        return filters.selectedSymbols;
    }
)

export const getSelectedPositionSelector = createSelector(
    [filtersSelector], (filters) => {
        return filters.selectedPosition;
    }
)

export const getSelectedStatusSelector = createSelector(
    [filtersSelector], (filters) => {
        return filters.selectedStatus;
    }
)

export const getSelectedTimeFrameSelector = createSelector(
    [filtersSelector], (filters) => {
        return filters.selectedTimeFrameView;
    }
)





