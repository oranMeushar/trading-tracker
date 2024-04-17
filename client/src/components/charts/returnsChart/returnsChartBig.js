import React, {memo, useEffect, useRef, useState} from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import moment from 'moment-timezone';
import { Container } from './returnsChartBig.style';
import drilldown from 'highcharts/modules/drilldown.js';
import { formatNumber } from '../../../utils/utils';

const ReturnsChart = ({data}) => {
    const chartRef = useRef(HighchartsReact.RefObject);
  
    const negativeAccNet = data?.negativeAccNet?.reduce((acc, curr) => acc + curr.y, 0) || 0
    const positiveAccNet = data?.positiveAccNet?.reduce((acc, curr) => acc + curr.y, 0) || 0;
    const avgReturn = data?.avgReturn || 0;
    
    drilldown(Highcharts);

    const options = {
        chart: {
            reflow: true,
            renderTo: 'container',
            height:600,
            events: {
                load: function () {
                    this.xAxis[0].update({
                        type: 'category'
                    });
                },
                
                drilldown: function (e) {
                    const i_categories = e.point.drilldown === 'win' 
                    ? data?.positiveAccNet?.map((item) => item.label)
                    : data?.negativeAccNet?.map((item) => item.label);

                    this.xAxis[0].update({
                        type: 'category',
                        categories: i_categories
                    }); 

                    this.yAxis[0].update({
                        tickPositions:null,
                        max: null,
                    }); 
                },

                drillup: function (e) {
                    this.xAxis[0].update({
                        type: 'category',
                        categories: ['Avg', 'Loss', 'Win']
                    });
                    // this.yAxis[0].update({
                    //     tickPositions: [negativeAccNet, 0 , positiveAccNet],
                    //     max: Math.max(negativeAccNet, positiveAccNet),
                    // });
                },

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
            
            formatter: function() {
                if (this.series.chart.drilldownLevels  && this.series.chart.drilldownLevels.length) {
                    // return false;
                    return `<div style="font-family: Roboto;  font-size: 12px; color: #000000; text-align: center; 
                    padding: 5px 10px; border-radius: 5px; border: 1px solid #74C86A; background-color: #FFFFFF;
                    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25); display: flex; flex-direction: column; justify-content: center; align-items: center; gap:10px">
                    <p><span style="font-weight: bold;">Date: </span>${moment(this.x).format('DD/MM')}</p>
                    <p><span style="font-weight: bold;">${this.series.name === 'win' ? 'Profit' : 'Loss'}:</span> $${this.y}</p>
                    <a href="#" style="font-family: Roboto; font-weight: 600; font-size: 12px; color: #74C86A; text-decoration: none;">View Trade</a>
                    </div>`;

                } else {
                    return `<div style="font-family: Roboto;  font-size: 12px; color: #000000; text-align: center; 
                    padding: 5px 10px; border-radius: 5px; border: 1px solid #74C86A; background-color: #FFFFFF;
                    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25); display: flex; flex-direction: column; justify-content: center; align-items: center; gap:10px">
                    <p><span style="font-weight: bold;">Since: </span>${moment(this.point.options.startDate).format('DD/MM/YYYY')}</p>
                    <p><span style="font-weight: bold;">Total ${this.key === 'win' ? 'Profit' : this.key === 'loss' ? 'Loss' : 'Average'}:</span> $${this.y}</p>
                    </div>`;
                }
            }

        },
        xAxis: {
            type: 'category',
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
            text:'<span style="font-family: Roboto">' + 'Wins vs Losses' +'</span>',
        },
        yAxis: [
            {
                title: {
                    text:    '<span style="font-family: Roboto;">' + 'Profit/Loss' +'</span>',
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
        ],

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    style: {
                        textOutline: false,
                    },
                    formatter: function() {
                        return `<span style="font-family: Roboto; color:#27313A font-weight: 600; font-size: 14px;">$${formatNumber(this.point.y)}</span>`;
                    }
                },
                minPointLength: 3,
            }
        },
       
        series:[
            {
                type: 'column',
                data:[
                    {
                        name: 'avg',
                        y: Math.abs(+avgReturn?.toFixed(2)),
                        drilldown: null,
                        color: {linearGradient: {x1: 0,x2: 0,y1: 0,y2: 1},stops: [[0, '#ffff62'],[1, '#ffff86']]},
                        startDate:data?.initialDate,
                        dataLabels: {
                            formatter: function () {
                                return  `<div style="font-family: Roboto; font-weight: 600; font-size: 14px;">$${formatNumber(avgReturn)}</div>`;
                            }
                        },
                    },
                    {
                        name: 'loss',
                        y: Math.abs(negativeAccNet),
                        drilldown: 'loss',
                        color: {linearGradient: {x1: 0,x2: 0,y1: 0,y2: 1},stops: [[0, '#ff3b3b'],[1, '#ff8282']]},                
                        startDate:data?.initialDate,
                    },
                    {
                        name: 'win',
                        y: positiveAccNet,
                        drilldown: 'win',
                        color: {linearGradient: {x1: 0,x2: 0,y1: 0,y2: 1},stops: [[0, '#3dee90'],[1, '#00bd96']]},
                        startDate:data?.initialDate,
                    },
                ],
            },
        ],
        drilldown: {
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return `<span style="font-family: Roboto; color:#27313A font-weight: 600; font-size: 14px;">$${formatNumber(this.point.y)}</span>`;
                        }
                    }
                }
            },
            series:[
                {
                    id:'loss',
                    name: 'loss',
                    data: data?.negativeAccNet,
                    type: 'column',
                    
                },
                {
                    id:'win',
                    name: 'win',
                    data: data?.positiveAccNet,
                    type: 'column',
                },
            ],
        },
    };


    return (
        <Container>

            <HighchartsReact
                // key={(containerWidth + containerHeight) || 1}
                highcharts={Highcharts}
                ref={chartRef}
                options={options}
            />
        </Container>
    );
};

export default memo(ReturnsChart);
