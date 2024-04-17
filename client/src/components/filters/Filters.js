import React, { useState } from 'react';
import { Container, DatePickerContainer } from './Filters.style';
import DatePicker from '../datePicker/DatePicker';
import { useDispatch } from 'react-redux';
import { useGetSymbolsHook } from '../../hooks/useTradesHooks';
import DropDown from '../dropDown/DropDown1';
import { setSelectedPosition, setSelectedStatus, setSelectedSymbols, setSelectedTimeFrameView } from '../../store/services/filtersReducer';

const Filters = ({isSymbols, isPosition, isStatus, isTimeFrame}) => {
    const { symbols } = useGetSymbolsHook();

    const [positions, setPositions] = useState([{id: 1, name: 'All'},{id: 2, name: 'Long'},{id: 3, name: 'Short'}]) 
    const [status, setStatus] = useState([{id: 1, name: 'All'},{id: 2, name:'Success'},{id: 3, name:'Failure'}])
    const [timeFrameView, setTimeFrameView] = useState([{id: 1, name: 'Daily'},{id: 2, name: 'Weekly'},{id: 3, name: 'Monthly'}])

    const dispatch = useDispatch();

    return (
        <Container>
            <DatePickerContainer>
                <DatePicker/>
            </DatePickerContainer>
            {
                isSymbols && <DropDown
                list={symbols}
                labelField={'name'}
                valueField={'id'}
                searchable={true}
                multi={true}
                clearable={true}
                // separator={true}
                searchBy={null}
                placeholder={'Search/Select'}
                dropdownRenderer={true}
                contentRenderer={true}
                onSelect={(selectedSymbols) => dispatch(setSelectedSymbols(selectedSymbols.length ? selectedSymbols.map(symbol => symbol.name) : []))}
                height={'40vmin'}
                className={'first'}
            />
            }
            {
                isStatus && <DropDown
                list={status}
                labelField={'name'}
                valueField={'id'}
                searchable={false}
                multi={false}
                clearable={false}
                separator={false}
                searchBy={null}
                placeholder={''}
                itemRenderer={true}
                contentRenderer={true}
                onSelect={(selectedStatus) => dispatch(setSelectedStatus(selectedStatus.length ? selectedStatus[0].name : ''))}
                height={'10vmin'}
            />
            }
            {
                isPosition && <DropDown
                list={positions}
                labelField={'name'}
                valueField={'id'}
                searchable={false}
                multi={false}
                clearable={false}
                separator={false}
                searchBy={null}
                placeholder={''}
                itemRenderer={true}
                contentRenderer={true}
                onSelect={(selectedPosition) => dispatch(setSelectedPosition(selectedPosition.length ? selectedPosition[0].name: ''))}
                height={'10vmin'}
            />
            }
            
            {
                isTimeFrame && <DropDown
                list={timeFrameView}
                labelField={'name'}
                valueField={'id'}
                searchable={false}
                multi={false}
                clearable={false}
                separator={false}
                searchBy={null}
                placeholder={''}
                itemRenderer={true}
                contentRenderer={true}
                onSelect={(selectedTimeFrameView) => dispatch(setSelectedTimeFrameView(selectedTimeFrameView.length ?  selectedTimeFrameView[0].name : ''))}
                height={'15vmin'}
            />
            }
            
            
        </Container>
    );
};

export default Filters;