import React, { useState } from 'react';
import { Container, CardsContainer, CardContainer, ChartsContainer } from './Dashboard.style';
import Filters from '../../components/filters/Filters';
import { useGetCardsHook, useGetTradesHook, useGetStatsHook, useGetInitialNetHook } from '../../hooks/useTradesHooks';
import AccChartSmall from '../../components/charts/comulativeChart/cumulative_chart_small';
import AccChartBig from '../../components/charts/comulativeChart/cumulative_chart_big';
import AccCard from '../../components/cards/accCard/AccCard';
import ReturnsChartBig from '../../components/charts/returnsChart/returnsChartBig';
import ReturnsChartSmall from '../../components/charts/returnsChart/returnsChartSmall';
import WinLostChartMain from '../../components/charts/winLostChart/winLostCharSmall';
import WinLostChartBig from '../../components/charts/winLostChart/winLostChartBig';
import withNavigation from '../../hocs/withNavigation/withNavigation';
import Modal from '../../components/modal/Modal';
import InitialNet from '../../components/initialNet/InitialNet';
import { useSelector } from 'react-redux';
import DailyChart from '../../components/charts/dailyChart/dailyChart';
import DailyAvgChart from '../../components/charts/dailyAvgChart/dailyAvgChart';
import { useResizeDetector } from 'react-resize-detector';
import PerCompanyChart from '../../components/charts/perCompanyChart/perCompanyChart';
import StatsCard from '../../components/StatsCard/StatsCard';
import { getReturnsSelector, getWinLostChartSelector,getPerformancePerCompanySelector,getAccSelector, getDailyChartSelector ,getStatsSelector} from '../../store/selectors/tradesSelector';
import { formatNumber } from '../../utils/utils';



const Dashboard = () => {

    const [isModal, setIsModal] = useState(false);

    useGetCardsHook();
    useGetTradesHook();
    useGetStatsHook();
    useGetInitialNetHook();
    
    const { res:accChartData } = useSelector(getAccSelector);
    const { res:returnsChartData } = useSelector(getReturnsSelector);
    const { res:winLostChartData } = useSelector(getWinLostChartSelector);
    const { res:trades } = useSelector(getDailyChartSelector);
    const { res:perCompanyData } = useSelector(getPerformancePerCompanySelector);
    const statsData  = useSelector(getStatsSelector);
    
    const { width, height, ref } = useResizeDetector();
    const { width:chartsWidth, height:chartsHeight, ref:chartsRef } = useResizeDetector();
    
    const isNewUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).isNew : false;

    return (
        <Container>
            <Filters isSymbols isPosition isStatus isTimeFrame/>
            <CardsContainer>
                <CardContainer ref={ref}>
                    <AccCard clickable={true} t1={'Return Net'} v1={`$${formatNumber(accChartData?.totalNet)}`}>
                        <AccChartSmall data={accChartData} height={Math.floor(height)} width={Math.floor(width)}/>
                        <AccChartBig data={accChartData}/>
                    </AccCard>
                </CardContainer>

                <CardContainer ref={ref}>
                    <AccCard clickable={true} t1={'Profit Factor'} v1={`$${formatNumber(returnsChartData?.profitFactor)}`} t2={'Avg Return'} v2={`$${formatNumber(returnsChartData?.avgReturn)}`}>
                        <ReturnsChartSmall data={returnsChartData}  height={Math.floor(height)} width={Math.floor(width)}/>
                        <ReturnsChartBig data={returnsChartData}/>
                    </AccCard>
                </CardContainer>
                
                <CardContainer ref={ref}>
                    <AccCard clickable={true} t1={'Wins'} v1={`${formatNumber(winLostChartData?.winsPercantage)}%`}t2={'Losses'} v2={`${formatNumber(winLostChartData?.lossesPercantage)}%`}>
                        <WinLostChartMain data={winLostChartData} height={Math.floor(height)} width={Math.floor(width-15)}/>
                        <WinLostChartBig data={winLostChartData}/>
                    </AccCard>
                </CardContainer>
            </CardsContainer>

            <ChartsContainer ref={chartsRef}>
                <StatsCard {...statsData}/>
                <DailyChart data={trades} width={Math.floor(chartsWidth)} height={Math.floor(chartsHeight)}/>
                <DailyAvgChart data={trades} width={Math.floor(chartsWidth)} height={Math.floor(chartsHeight)}/>
                <PerCompanyChart data={perCompanyData} width={Math.floor(chartsWidth)} height={Math.floor(chartsHeight)}/>
            </ChartsContainer>
             
            {
                isNewUser &&
                <Modal setIsModal={setIsModal}>
                    <InitialNet/>
                </Modal>
            }
        </Container>
    );
};

export default  withNavigation(Dashboard);