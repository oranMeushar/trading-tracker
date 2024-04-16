import React, { useEffect, useState } from 'react';
import { Container, Label, Icon, NewTrade } from './Navigation.style';
import dashboardImg from '../../resources/images/dashboard.png';
import reportsImg from '../../resources/images/reports.png';
import statsImg from '../../resources/images/stats.png';
import tradeLogs from '../../resources/images/tradeLogs.png';
import {NavLink} from 'react-router-dom';
import Modal from '../modal/Modal';
import NewTradeForm from '../newTradeForm/NewTradeForm';
import { setLogout } from '../../store/services/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import logoutImg from '../../resources/images/logout.png';
import exitImg from '../../resources/images/exit.png';

const Navigation = () => {
    const [isModal, setIsModal] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    return (
        <Container>
            <Label >
                <Icon image={dashboardImg}/>
                <NavLink to='/'>Dashboard</NavLink>
            </Label>
            <Label>
                <Icon image={statsImg}/>
                <NavLink to='/stats'>Statistic</NavLink>
            </Label>
            <Label> 
                <Icon image={tradeLogs}/>
                <NavLink to='/logs'>Trade Logs</NavLink>
            </Label>
            <NewTrade onClick={() => setIsModal(!isModal)}>
                <p><span>+</span> New Trade</p>
            </NewTrade>
            <Label onClick={()=>dispatch(setLogout())}>
                <Icon image={exitImg}/>
                <NavLink to='/register'>Logout</NavLink>
            </Label>
            {   isModal && 
                <Modal setIsModal={setIsModal} width={'60vmin'}>
                    <NewTradeForm/>
                </Modal>
            }
        </Container>
    );
};

export default Navigation;