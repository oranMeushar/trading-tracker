import React, { useState } from 'react';
import { Container, DatePickerContainer } from './Logs.style';
import withNavigation from '../../hocs/withNavigation/withNavigation';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { setTradesLogs } from '../../store/services/logsReducer';
import DatePicker from '../../components/datePicker/DatePicker';
import { useGetTradesLogsHook } from '../../hooks/useLogsHook';
import { getTradesSelector } from '../../store/selectors/tradesSelector';
import ExpendingCard from '../../components/expendingCard/ExpendingCard';
import moment from 'moment-timezone';
import Filters from '../../components/filters/Filters';
import { getFilteresLogsSelector } from '../../store/selectors/logsSelector';


const Logs = () => {

    useGetTradesLogsHook();
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    const tradesList = useSelector(getTradesSelector);


    const loadMoreData = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };


  const pageCount = Math.ceil(tradesList.length / perPage);
  const offset = currentPage * perPage;
  const currentData = tradesList.slice(0, offset + perPage);
  const filteredLogs = useSelector(getFilteresLogsSelector(currentData));

    return (
        <Container id="scrollableDiv">
            <Filters
            isSymbols
            isPosition
            isStatus
            />
            <InfiniteScroll
                dataLength={filteredLogs.length}
                next={loadMoreData}
                hasMore={currentPage < pageCount}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                    </p>
                }
                scrollableTarget={"scrollableDiv"}
            >
            {filteredLogs.map((log, i) =>(
                <ExpendingCard {...log} key={i} />
            ))}
            </InfiniteScroll> 
        </Container>
    );
};

export default withNavigation(Logs);