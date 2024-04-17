import { useDispatch, useSelector } from 'react-redux';
import { useGetTradeQuery, useGetTradesQuery } from '../store/api';
import { getSelectedDateSelector } from '../store/selectors/filtersSelector';
import { useEffect } from 'react';
import { setTrades } from '../store/services/tradesReducer';



export const useGetTradesLogsHook = () => {
    const dispatch = useDispatch();
    const selectedDate = useSelector(getSelectedDateSelector);
    const { data, error, isLoading, isFetching, isSuccess, isError, refetch, isUninitialized } = useGetTradesQuery({selectedDate});
    
    // *the API request has started, succeeded and the data is available
    useEffect(() => {
        if (!isUninitialized && isSuccess && data) {
            dispatch(setTrades(data.data));
        }
    }, [isSuccess, data]);
}


export const useGetTradeHook = (id) => {
    const dispatch = useDispatch();
    const { data, error, isLoading, isFetching, isSuccess, isError, refetch, isUninitialized } = useGetTradeQuery({id});

    return data?.data || {};
}