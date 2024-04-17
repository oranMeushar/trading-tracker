import React, { useState, useEffect } from 'react';
import {Container, Add, InputContainer, DeleteButton} from './TimePricePoint.style';
import * as uuid from 'uuid';

const TimePricePoint = ({onchange}) => {

    const [state, setState] = useState([]);

    useEffect(() => {
        onchange(state);
    }, [state]);

    const handleNewPoint = (e) => {
        setState([...state, {time: '', price: '', id:uuid.v4()}]);
    }

    const handleDeleteItem = (id) => {
        setState(state.filter(item => item.id !== id));
    }

    const handleTimeChange = (e, id) => {
        const newState = state.map(item => 
            item.id === id ? ({...item, time: e.target.value}) : item
        );
        setState(newState);
    }

    const handlePriceChange = (e, id) => {
        const newState = state.map(item =>
            item.id === id ? ({...item, price: e.target.value}) : item
        );
        setState(newState);
    }

    return (
        <Container>
            <Add onClick={handleNewPoint}>+</Add>
            {
                state.map((item, index) => {
                    return(
                        <InputContainer key={item.id}>
                            <input type='time' value={item.time} onChange={(e)=>handleTimeChange(e, item.id)}/>, 
                            <input type='number' value={item.price} placeholder='Price' onChange={(e) => handlePriceChange(e, item.id)}/>
                            <DeleteButton className='delete-button' onClick={()=>handleDeleteItem(item.id)}>X</DeleteButton>
                        </InputContainer>
                    )
                })
            }
        </Container>
    );
};

export default TimePricePoint;