import React from 'react';
import {Container, ButtonsContainer} from './DeleteAlert.style';
import {  useLocation, useNavigate } from 'react-router-dom';

const DeleteAlert = ({deleteTrade, setIsModal}) => {

    const handleLeaveButtonClicked = () =>{
       
    }

    return (
        <Container>
            <p>Are you sure you want to delete this trade?</p>
            <ButtonsContainer>
                <button onClick={()=>deleteTrade()}>Delete</button>
                <button onClick={() =>setIsModal(false)}>Cancel</button>
            </ButtonsContainer>
        </Container>
    );
};

export default DeleteAlert;