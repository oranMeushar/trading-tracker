import React, { useEffect, useState } from 'react';
import { Container } from './DatePicker.style';
import { DateRangePicker  } from 'react-date-range';
import calenderImg from '../../resources/images/calendar.svg';
import OutsideClickHandler from 'react-outside-click-handler';
import moment from 'moment-timezone';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; 
import { setSelectedDate } from '../../store/services/filtersReducer';
import { useDispatch } from 'react-redux';
import {AnimatePresence, motion} from 'framer-motion';

const DatePicker = () => {

    const [selectionRange, setSelectionRange] = useState({
        startDate: moment().subtract(1, 'months').startOf('day').toDate(),
        endDate: new Date(),
        key: 'selection',
    });
    const [date, setDate] = useState(`${moment(selectionRange.startDate).format('MMM DD, YYYY')} - ${moment(selectionRange.endDate).format('MMM DD, YYYY')}`);
    const [isCalender, setIsCalender] = useState(false);

    const dispatch = useDispatch();



    useEffect(() => {
        if(!isCalender){
            setDate(`${moment(selectionRange.startDate).format('MMM DD, YYYY')} - ${moment(selectionRange.endDate).format('MMM DD, YYYY')}`);
            dispatch(setSelectedDate({startDate: moment(selectionRange.startDate).format('YYYY-MM-DDTHH:mm:ss'), endDate: moment(selectionRange.endDate).format('YYYY-MM-DDTHH:mm:ss')}));
        }
    },[isCalender])

    return (
        <OutsideClickHandler onOutsideClick={()=>setIsCalender(false)}>
            <Container onClick={()=>setIsCalender(true)}>
                <img src={calenderImg} alt='calender'/>
                <input type='text' placeholder='Pick Date Range' readOnly value={date}/>
                <AnimatePresence>
                {
                    isCalender && 
                    <motion.div
                        style={{position:'absolute', zIndex:1000, left:0, top:'100%'}}
                        initial={{scaleY:0,  opacity:0, x:0,transformOrigin:'top'}}
                        animate={{scaleY:1, opacity:1, x:0, transformOrigin:'top'}}
                        exit={{scaleY:0, scaleY:0, opacity:0, x:0, transformOrigin:'top'}}
                        transition={{duration:0.2, stiffness:70, type:'spring'}}
                    >
                    {/* <motion.div
                        style={{position:'absolute', zIndex:1000, left:0, top:'100%'}}
                        initial={{opacity:0, y:-200, x:0}}
                        animate={{opacity:1, y:0, x:0}}
                        exit={{opacity:0, y:-200, x:0}}
                        transition={{duration:0.2, stiffness:70, type:'spring'}}
                    > */}
                    <DateRangePicker 
                        ranges={[selectionRange]}
                        onChange={(ranges)=>setSelectionRange(ranges.selection)}
                        className='date-picker'
                    />
                    </motion.div>
                }
                </AnimatePresence>
            </Container>
        </OutsideClickHandler>
    );
};

export default DatePicker;
