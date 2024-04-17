import React, { useState } from 'react';
import { Container, Header, UpArrow, DownArrow, ButtonsContainer, HeaderTitle, BreakLine, Body, Content, ImageContainer } from './ExpendingCard.style';
import scaleUp from '../../resources/images/scale_up.png';
import scaleDown from '../../resources/images/scale_down.png';
import OutsideClickHandler from 'react-outside-click-handler';
import noImage from '../../resources/images/no_image.jpeg';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';


const ExpendingCard = ({
    actualRiskRewardRatio,
    actualStop,
    actualTarget,
    date,
    desiredRiskRewardRatio,
    desiredStop,
    desiredTarget,
    entryPrice,
    entryProccess,
    executions,
    exitPrice,
    exitProccess,
    image,
    isSuccess,
    position,
    profitLoss,
    stockSymbol,
    stocksQuantity,
    timeEntry,
    timeExit,
    tradingError,
    user,
    _id,
    net
    }) => {

    const [isScaled, setIsScaled] = useState(false);



    const handleScaleClciked = (e) => {
        setIsScaled(!isScaled);
        e.stopPropagation();
    }

    return (
        <OutsideClickHandler onOutsideClick={()=>setIsScaled(false)}>
        <Container isScaled={isScaled} isSucces={isSuccess}>
            <Header>
                <HeaderTitle>
                    <span>{moment(date).format('DD/MM/YYYY')}</span>
                    <span>Net:${net}</span>
                </HeaderTitle>
                {/* <ButtonsContainer>
                    <img src={isScaled ? scaleDown : scaleUp} onClick={handleScaleClciked}/>
                </ButtonsContainer> */}
            </Header>
            <Body>
                {/* <BreakLine/> */}
                <ImageContainer>
                    <img src={ image?.length ? `http://localhost:8080/${image}` : noImage} alt="image"/>
                </ImageContainer>
                <Content>
                    <div><span>Total Trades</span>{executions}</div>
                    <div><span>Win Rate</span>{isSuccess ? (desiredTarget /  actualTarget * 100).toFixed(2) : (desiredStop / actualStop * 100).toFixed(2)}%</div>
                    <div><span>Profit/Loss</span>${profitLoss}</div>
                    <div><span>Commissions</span>${(stocksQuantity * 0.001 + executions * 0.001).toFixed(2)}</div>
                    <div><span>Entry Price</span>${entryPrice}</div>
                    <div><span>Exit Price</span>${exitPrice}</div>
                    <div><span>Symbol</span>{stockSymbol}</div>
                    <div><span>Position</span>{position}</div>
                </Content>
            </Body>
            <Link to={`/logs/${_id}`}>More Details</Link>
        </Container>
        </OutsideClickHandler>
    );
};

export default ExpendingCard;