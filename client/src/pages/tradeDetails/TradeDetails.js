import React, { useEffect, useState } from 'react';
import { Container, ButtonsContainer, Button, BackArrow, NextArrow, ContentContainer, Content, Image, Top } from './TradeDetails.style';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTradeHook } from '../../hooks/useLogsHook';
import noImage from '../../resources/images/no_image.jpeg';
import moment from 'moment-timezone';
import Filters from '../../components/filters/Filters';
import withNavigation from '../../hocs/withNavigation/withNavigation';
import { useSelector } from 'react-redux';
import { getTradesSelector } from '../../store/selectors/tradesSelector';
import { getFilteresLogsSelector } from '../../store/selectors/logsSelector';
import { useDeleteTradeHook, useGetTradesHook } from '../../hooks/useTradesHooks';
import trashImg from '../../resources/images/trash.png';
import DeleteAlert from '../../components/alert/DeleteAlert';
import Modal from '../../components/modal/Modal';

const TradeDetails = () => {

    const {id} = useParams();

    const [currentId, setCurrentId] = useState(id);

    const [nextId, setNextId] = useState(null);
    const [prevId, setPrevId] = useState(null);
    const [isModal, setIsModal] = useState(false);
    
    const data = useGetTradeHook(currentId);

    const {tradesList} = useGetTradesHook();
    const {deleteTrade} = useDeleteTradeHook({currentId});

    const navigate= useNavigate();

    useEffect(() => {
        setNextId(tradesList[tradesList.findIndex(trade => trade._id === currentId) + 1]?._id);
        setPrevId(tradesList[tradesList.findIndex(trade => trade._id === currentId) - 1]?._id);
    }, [tradesList, currentId]);


    const handleDeleteTrade = () => {
        deleteTrade({id:currentId});
        setIsModal(false);
        setCurrentId(tradesList[tradesList.findIndex(trade => trade._id === currentId) + 1]?._id);
    }


    return (
        <Container>
            <ButtonsContainer>
                <Button onClick={()=>navigate(-1)}><BackArrow/>Back</Button>
                <Button onClick={()=>setCurrentId(prevId)} disabled={!prevId}><BackArrow disabled={!prevId}/>Prev</Button>
                <Button onClick={()=>setCurrentId(nextId)} disabled={!nextId}>Next<NextArrow disabled={!nextId}/></Button>
            </ButtonsContainer>
            <ContentContainer>
                <img src={trashImg} alt="trash" className="trash" onClick={()=>setIsModal(true)}/>
                <Top>
                    <div>{data.stockSymbol}</div>
                    <div>{moment(data?.date).format('DD/MM/YYYY')}</div>
                </Top>
                <Content>
                    <div><span>Symbol: </span>{data.stockSymbol}</div>
                    <div><span>Entry Price: </span>${data.entryPrice}</div>
                    <div><span>Exit Price: </span>${data.exitPrice}</div>
                    <div><span>Entry Process: </span>{data.entryProccess}</div>
                    <div><span>Exit Process: </span>{data.exitProccess}</div>
                    <div><span>Time Entry: </span>{data.timeEntry}</div>
                    <div><span>Time Exit: </span>{data.timeExit}</div>
                    <div><span>Lots: </span>{data.lots}</div>
                    <div><span>Trading Error: </span>{data.tradingError}</div>
                    <div><span>Position: </span>{data.position}</div>
                    <div><span>Is Success: </span>{data.isSuccess ? 'Yes' : 'No'}</div>
                    <div><span>{data.isSuccess ? 'Profit' : 'Loss'}: </span>${data.profitLoss}</div>
                    <div><span>Commission: </span>${(data.lots * 3).toFixed(2)}</div>
                    <div><span>Net: </span>{`$${data.net}`}</div>

                </Content>
                <Image src={data?.image ? `http://localhost:8080/${data?.image}` : noImage}/>
            </ContentContainer>
            {
                isModal && 
                <Modal setIsModal={setIsModal}> 
                    <DeleteAlert deleteTrade={handleDeleteTrade} setIsModal={setIsModal}/>
                </Modal>
            }
        </Container>
    );
};

export default withNavigation(TradeDetails);