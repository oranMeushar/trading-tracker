import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, updateUser } from '../store/services/usersReducer';
import { toast } from 'react-toastify';
import { useGetUserQuery, useGetTradesQuery, useAddTradeMutation, useGetSymbolsQuery, useGetCardsQuery, useSetInitialNetMutation, useGetStatsQuery, useGetInitialNetQuery, useDeleteTradeMutation } from '../store/api';
import { getTradesSelector, getSymbolsSelector } from '../store/selectors/tradesSelector';
import { setCards, setSymbols, setTrades, setStats, setInitialNet } from '../store/services/tradesReducer';
import { getSelectedDateSelector, getSelectedSymbolsSelector } from '../store/selectors/filtersSelector';

export const useGetTradesHook = () => {


    const dispatch = useDispatch();
    const selectedDate = useSelector(getSelectedDateSelector);
    const { data, error, isLoading, isFetching, isSuccess, isError, refetch, isUninitialized } = useGetTradesQuery({selectedDate});
    const tradesList = useSelector(getTradesSelector);
    
    // *the API request has started, succeeded and the data is available
    useEffect(() => {
        if (!isUninitialized && isSuccess && data) {
            dispatch(setTrades(data.data));
        }
    }, [isSuccess, data]);
    
    return { tradesList };
}

export const useGetSymbolsHook = () => {
    const dispatch = useDispatch();
    const { data, error, isLoading, isFetching, isSuccess, isError, refetch, isUninitialized } = useGetSymbolsQuery();
    const symbols = useSelector(getSymbolsSelector);

    // *the API request has started, succeeded and the data is available
    useEffect(() => {
        if (!isUninitialized && isSuccess && data) {
            dispatch(setSymbols(data.data));
        }
    }, [isSuccess, data]);

    return { symbols };
}

export const useGetInitialNetHook = () => {
    const dispatch = useDispatch();
    const { data, error, isLoading, isFetching, isSuccess, isError, refetch, isUninitialized } = useGetInitialNetQuery();

    // *the API request has started, succeeded and the data is available
    useEffect(() => {
        if (!isUninitialized && isSuccess && data) {
            dispatch(setInitialNet(data.data));
        }
    }, [isSuccess, data]);

    return { initialNet: data?.data };
}



export const useAddTradeHook = () => {
    const [postNewTrade, {isLoading, isError, isSuccess, data, error, isUninitialized, reset}] = useAddTradeMutation();
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess) {
            //TODO: dispatch action to update the store
        }

        if (!isUninitialized && isSuccess) {
            toast.success('User updated successfully');
        }
    }, [isSuccess, isUninitialized])


    if (!isUninitialized && isError) {
        reset();
        // toast.error(error.data.message);
    }
    return { postNewTrade };
}

export const useDeleteTradeHook = ({id}) => {
    const [deleteTrade, {isLoading, isError, isSuccess, data, error, isUninitialized, reset}] = useDeleteTradeMutation({id});

    const dispatch = useDispatch();
    const tradesList = useSelector(getTradesSelector);

    useEffect(() => {
        if (!isUninitialized && isSuccess) {
            dispatch(setTrades(tradesList.filter(trade => trade.id !== id)));
            toast.success('Trade deleted successfully');
        }
        if (!isUninitialized && isError) {
            toast.error('Something went wrong');
            reset();
        }

    }, [isSuccess, isUninitialized])

    return { deleteTrade };
}
            



export const useGetCardsHook = () => {
    const dispatch = useDispatch();
    const selectedDate = useSelector(getSelectedDateSelector);
    const { data, error, isLoading, isFetching, isSuccess, isError, refetch, isUninitialized } = useGetCardsQuery({selectedDate});
    
    // *the API request has started, succeeded and the data is available
    useEffect(() => {
        if (!isUninitialized && isSuccess && data) {
            dispatch(setCards(data.data));
        }
    }, [isSuccess, data]);
}

export const useGetStatsHook = () => {
    const dispatch = useDispatch();

    const selectedDate = useSelector(getSelectedDateSelector);
    const { data, error, isLoading, isFetching, isSuccess, isError, refetch, isUninitialized } = useGetStatsQuery({selectedDate});
    
    // *the API request has started, succeeded and the data is available
    useEffect(() => {
        if (!isUninitialized && isSuccess && data) {
            dispatch(setStats(data.data));
        }
    }, [isSuccess, data]);
}
    
export const useSetInitialNetHook = () => {
    const dispatch = useDispatch();
    const [postInitialNetQuery, {isLoading, isError, isSuccess, data, error, isUninitialized, reset}] = useSetInitialNetMutation();

    useEffect(() => {
        if (!isUninitialized && isSuccess) {
            toast.success('Initial net updated successfully');
            const user = JSON.parse(localStorage.getItem('user'));
            user.isNew = false;
            localStorage.setItem('user', JSON.stringify(user));
        }
    }, [isSuccess, isUninitialized])

    if (!isUninitialized && isError) {
        toast.error(error.data.message);
    }
    return { postInitialNetQuery };
}




