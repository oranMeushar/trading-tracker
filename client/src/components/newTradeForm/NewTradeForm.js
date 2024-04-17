import React, { useState } from 'react';
import { Container, Header, Label, SubmitButton } from './NewTradeForm.style';
import DatePicker from 'react-date-picker';
import Dropdown from '../dropDown/DropDown';
import { useAddTradeHook } from '../../hooks/useTradesHooks'
import moment from 'moment-timezone';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import TimePicker from 'react-time-picker';

const NewTradeForm = () => {
    const [date, setDate] = useState(moment().toDate());
    const [stockSymbol, setStockSymbol] = useState('');
    const [position, setPosition] = useState('');
    const [entryPrice, setEntryPrice] = useState('');
    const [exitPrice, setExitPrice] = useState('');
    const [timeEntry, setTimeEntry] = useState('');
    const [timeExit, setTimeExit] = useState('');
    const [status, setStatus] = useState('');
    const [profitLoss, setProfitLoss] = useState('');
    const [entryProccess, setEntryProccess] = useState('');
    const [exitProccess, setExitProccess] = useState('');
    const [tradingError, setTradingError] = useState('');
    const [lots, setLots] = useState('');

    const positionList = ['Long', 'Short'];
    const statusList = ['Success','Failed'];
    const entriesProccessList = ['As Planned', 'Too Early', 'Too Late', 'Revenge', 'FOMO'];
    const exitProccessList = ['Profit Target', 'Stop Loss', 'Trailing Stop', 'Manual', 'Time'];
    const tradingErrors = ['Greed', 'Sold too early', 'Held too long', 'No Error', 'Bad Entry'];

    const { postNewTrade } = useAddTradeHook();

    const handleSubmitButton = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('date', moment(date).format('YYYY-MM-DDTHH:mm:ss'));
        formData.append('stockSymbol', stockSymbol);
        formData.append('position', position);
        formData.append('entryPrice', entryPrice);
        formData.append('exitPrice', exitPrice);
        formData.append('timeEntry', timeEntry);
        formData.append('timeExit', timeExit);
        formData.append('isSuccess', status === 'Success');
        formData.append('profitLoss', profitLoss);
        formData.append('entryProccess', entryProccess);
        formData.append('exitProccess', exitProccess);
        formData.append('tradingError', tradingError);
        formData.append('lots', lots);

        
        postNewTrade(formData);
        //loop over formdata
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }
    }

    console.log(timeEntry);

    return (
        <Container>
            <Header>Add New Trade</Header>
            <Label>
                <p>Date:</p>
                <DatePicker onChange={setDate} value={date} className='date-picker'/>
            </Label>
            <Label>
                <p>Stock Symbol:</p>
                <input type='text' onChange={(e) => setStockSymbol(e.target.value)} value={stockSymbol}/>
            </Label>
            <Label>
                <p>Entry Price:</p>
                <input type='number' onChange={(e) => setEntryPrice(e.target.value)} value={entryPrice}/>
            </Label>
            <Label>
                <p>Exit Price:</p>
                <input type='number' onChange={(e) => setExitPrice(e.target.value)} value={exitPrice}/>
            </Label>
            <Label>
                <p>Time Entery:</p>
                <TimePicker value={timeEntry} onChange={(time) => setTimeEntry(time)} format="HH:mm" maxTime='23:59' minTime='00:00'/>
            </Label>
            <Label>
                <p>Time Exit:</p>
                <TimePicker value={timeExit} onChange={(time) => setTimeExit(time)} format="HH:mm" maxTime='23:59' minTime='00:00'/>
            </Label>
            <Label>
                <p>Profit/Loss:</p>
                <input type='number' onChange={(e) => setProfitLoss(e.target.value)} value={profitLoss}/>
            </Label>
            <Label>
                <p>Lots:</p>
                <input type='number' onChange={(e) => setLots(e.target.value)} value={lots} min={1}/>
            </Label>
            <Label>
                <p>Position:</p>
                <Dropdown list={positionList} onchange={(value) =>setPosition(value)}/>
            </Label>
            <Label>
                <p>Status:</p>
                <Dropdown list={statusList} onchange={(value) =>setStatus(value)} value={status}/>
            </Label>
            
            <Label>
                <p>Entry Proccess:</p>
                <Dropdown list={entriesProccessList} onchange={(value) =>setEntryProccess(value)} value={entryProccess}/>
            </Label>
            <Label>
                <p>Exit Proccess:</p>
                <Dropdown list={exitProccessList} onchange={(value) =>setExitProccess(value)} value={exitProccess}/>
            </Label>
            <Label>
                <p>Trading Error:</p>
                <Dropdown list={tradingErrors} onchange={(value) =>setTradingError(value)} value={tradingError}/>
            </Label>
            <SubmitButton onClick={handleSubmitButton}>Submit</SubmitButton>
        </Container>
    );
};

export default NewTradeForm;