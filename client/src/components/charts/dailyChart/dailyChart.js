import React, {memo, useEffect, useLayoutEffect, useRef, useState} from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more'
import HC_patternFill from 'highcharts-pattern-fill';
import HighchartVaryWide from 'highcharts/modules/variwide';
import moment from 'moment-timezone';
import {useDispatch, useSelector} from 'react-redux';
import { ChartWrapper, Header } from './dailyChart.style';
import HighchartsStock from 'highcharts/highstock';
import drilldown from 'highcharts/modules/drilldown.js';
// HC_patternFill(Highcharts);
// HC_more(Highcharts);
// HighchartVaryWide(Highcharts);
// Highcharts.AST.allowedReferences.push('data:');

const DailyChart = ({data, width, height}) => {
    const chartRef = useRef(HighchartsReact.RefObject);
    
    const {cards, dailyTrades} = data;
    const xAxisCategories = cards.map((item) => moment(item.date).format('DD/MM'));

    

    const options = {
        chart: {
            reflow: true,
            renderTo: 'container',
            // alignTicks: false,
            // animation:false,
            height:200,
            width: 0.9*width,
            // marginTop: 15,
            backgroundColor:'#f3f2ef',

            events: {
                redraw: function (e) {
                    if (this.series[0].data.length < 10) {
                        this.series[0].options.pointWidth = 50;
                        this.series[0].redraw();
                    }
                }
            }
        },
        credits: {
            enabled: false
        },
        tooltip: {
            useHTML: true,
            shared: true,
            
            formatter: function() {
                const isSuccess = this.points[1].point.options.isSuccess;
                const profitLoss = this.points[1].point.options.y;
                const net = this.points[0].point.options.y;
                const date = moment(this.points[1].point.options.date).format('DD/MM');
                return `<div style="font-family: Roboto;  font-size: 12px; color: #000000; text-align: center; 
                            padding: 5px 10px; border-radius: 5px; border: 1px solid #74C86A; background-color: #FFFFFF;
                            box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25); display: flex; flex-direction: column; justify-content: center; align-items: center; gap:10px">
                            <p><span style="font-weight: bold;">Date: </span>${date}</p>
                            <p><span style="font-weight: bold;">Total Net:</span> $${net}</p>
                            <p><span style="font-weight: bold;">${isSuccess ? 'Profit' : 'Loss'}:</span> $${profitLoss}</p>
                </div>`;
               
            }

        },
        xAxis: {
            type: 'category',
            categories: xAxisCategories,
            labels: {
                formatter: function() {
                        return '<span style="font-family: Roboto; color:#27313A font-weight: 600; font-size: 14px;">' + this.value + '</span>';
                }
            },
        },
        legend:{
            enabled: false,
        },
        title: {
            text: null,
            // text:'<span style="font-family: Roboto">' + 'Wins vs Losses' +'</span>',
        },
        yAxis: [
            {
                title: {
                    text:    '<span style="font-family: Roboto;">' + 'Net' +'</span>',
                    margin:30,
                    style: {
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        fontSize: '12px',
                    }
                },
                labels: {
                    useHTML: true,
                    formatter: function () {
                        return  `<div style="font-family: Roboto; font-weight: 600; font-size: 12px; color: black">$${this.value}</div>`;
                    }
                },
                tickAmount: 6,
            },
            {
                opposite: true,
                title: {
                    text:    '<span style="font-family: Roboto;">' + 'Profits/Loss' +'</span>',
                    margin:30,
                    style: {
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        fontSize: '12px',
                    }
                },
                labels: {
                    useHTML: true,
                    formatter: function () {
                        return  `<div style="font-family: Roboto; font-weight: 600; font-size: 12px; color: black">$${this.value}</div>`;
                    }
                },
            }
        ],
        plotOptions: {
            column: {
                borderWidth: 0,
            },
        },
       
        series:[
            {
                name: 'Net',
                type: 'spline',
                // name: 'Total Return Net',
                data:cards,
                zIndex: 10,
            },
            {
                type: 'column',
                name: 'Daily',
                data: dailyTrades,
                yAxis: 1,
                zIndex: 5,
                pointWidth: 30,
            }
        ],
    };


    return (
        <ChartWrapper>
            <Header>
                <p>Performance Breakdown: Daily/Weekly/Monthly</p>
                <p>Last: N days</p>
            </Header>
            <HighchartsReact
                // key={(ChartWrapperWidth + containerHeight) || 1}
                highcharts={Highcharts}
                ref={chartRef}
                options={options}
            />
        </ChartWrapper>
    );
};

export default memo(DailyChart);
