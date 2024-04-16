import React from 'react';
import { Container, Header } from './StatsCard.style';

const StatsCard = ({fees, trades, winsProbability, lossesProbability, biggestWin, biggestLoss, biggestWinStreak, biggestLossStreak, bestWeek}) => {
    return (
        <Container>
            <Header>Stats</Header>
            <p>Fees: <span>${fees}</span></p>
            <p>Trades: <span>{trades}</span></p>
            <p>Win Probability: <span>{(winsProbability * 100).toFixed(0)}%</span></p>
            <p>Loss Probability: <span>{(lossesProbability * 100).toFixed(0)}%</span></p>
            <p>Biggest Win: <span>${biggestWin || 0}</span></p>
            <p>Biggest Loss: <span>${biggestLoss || 0}</span></p>
            <p>Biggest Win Streak: <span>{biggestWinStreak}</span></p>
            <p>Biggest Loss Streak: <span>{biggestLossStreak}</span></p>
            <p>Best Week: <span>${bestWeek}</span></p>
        </Container>
    );
};

export default StatsCard;