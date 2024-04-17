import React from 'react';
import { Charts, Container } from './Stats.style';
import withNavigation from '../../hocs/withNavigation/withNavigation';
import { useGetTradesHook } from '../../hooks/useTradesHooks';
import { getPerformanceByHour, getTradingPerformance } from '../../store/selectors/tradesSelector';
import { useSelector } from 'react-redux';
import PerformanceChart from '../../components/charts/performanceChart/performanceChart';
import { useResizeDetector } from 'react-resize-detector';
import Filters from '../../components/filters/Filters';
import HourlyChart from '../../components/charts/hourlyChart/HourlyChart';


const Stats = () => {

    useGetTradesHook();

    const {res:entry} = useSelector(getTradingPerformance('entryProccess'));
    const {res:exit} = useSelector(getTradingPerformance('exitProccess'));
    const {res:error} = useSelector(getTradingPerformance('tradingError'));
    const { width:chartsWidth, height:chartsHeight, ref:chartsRef } = useResizeDetector();
    
    const {res: dataByHour} = useSelector(getPerformanceByHour);

    return (
        <Container>
            <Filters isSymbols isPosition />
            <Charts ref={chartsRef}>
            <PerformanceChart title={'Entry Proccess'} data={entry} width={Math.floor(chartsWidth)} height={Math.floor(chartsHeight)}/>
            <PerformanceChart title={'Exit Proccess'} data={exit} width={Math.floor(chartsWidth)} height={Math.floor(chartsHeight)}/>
            <PerformanceChart title={'Trading Error'} data={error} width={Math.floor(chartsWidth)} height={Math.floor(chartsHeight)}/>
            <HourlyChart title={'Performance By Hour'} data={dataByHour} width={Math.floor(chartsWidth)} height={Math.floor(chartsHeight)}/>
            </Charts>
        </Container>
    );
};

export default withNavigation(Stats);