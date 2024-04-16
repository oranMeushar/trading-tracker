import React, {memo, useEffect, useLayoutEffect, useRef, useState} from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more'
import HC_patternFill from 'highcharts-pattern-fill';
import HighchartVaryWide from 'highcharts/modules/variwide';
import moment from 'moment-timezone';
import {useDispatch, useSelector} from 'react-redux';
import { Container } from './winLostChartBig.style';
import HighchartsStock from 'highcharts/highstock';
import drilldown from 'highcharts/modules/drilldown.js';
// HC_patternFill(Highcharts);
// HC_more(Highcharts);
// HighchartVaryWide(Highcharts);
// Highcharts.AST.allowedReferences.push('data:');

const WinLostChart = ({data}) => {
    const chartRef = useRef(HighchartsReact.RefObject);
    const containerRef = useRef();
  

    const {winsPercantage, lossesPercantage, initialDate, wins, losses} = data;

    const winsLong = wins.filter(item => item.position === 'Long').length / wins.length * 100;
    const winsShort = wins.filter(item => item.position === 'Short').length / wins.length * 100;

    const lossesLong = losses.filter(item => item.position === 'Long').length / losses.length * 100;
    const lossesShort = losses.filter(item => item.position === 'Short').length / losses.length * 100;
    

    console.log(losses.filter(item => item.position === 'Long'));

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
                    this.xAxis[0].update({
                        type: 'category',
                        categories: ['Short', 'Long']
                    }); 
                },

                drillup: function (e) {
                    this.xAxis[0].update({
                        type: 'category',
                        categories: ['Losses', 'Wins']
                    });
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
            // positioner: function(boxWidth, boxHeight, point) {
            //     return {
            //         x: point.plotX + this.chart.plotLeft - boxWidth / 2,
            //         y: point.plotY + this.chart.plotTop - boxHeight - 30
            //     };
            // },

            // backgroundColor: "rgba(255,255,255,0)",            
            formatter: function() {
                return false;
                // if (this.series.chart.drilldownLevels  && this.series.chart.drilldownLevels.length) {
                //     return false;

                // } else {
                //     let a = this;
                //     return `<div style="font-family: Roboto;  font-size: 12px; color: #000000; text-align: center; 
                //     padding: 5px 10px; border-radius: 5px; border: 1px solid #74C86A; background-color: #FFFFFF;
                //     box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25); display: flex; flex-direction: column; justify-content: center; align-items: center; gap:10px">
                //     <p><span style="font-weight: bold;">Since: </span>${moment(this.point.options.startDate).format('DD/MM/YYYY')}</p>
                //     <p><span style="font-weight: bold;">${this.key}:</span> ${this.y}%</p>
                //     </div>`;
                // }
            }

        },
        xAxis: {
            type: 'category',
            // categories: categories,
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
            text:'<span style="font-family: Roboto">' + 'Wins/Losses' +'</span>',
        },
        yAxis: [
            {
                max: 100,
                title: {
                    text:    '<span style="font-family: Roboto;">' + 'Percentage' +'</span>',
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
                        return  `<div style="font-family: Roboto; font-weight: 600; font-size: 12px; color: black">${this.value}%</div>`;
                    }
                },
                tickAmount: 6,
            },
        ],

        plotOptions: {
            series: {
                dataLabels: {
                    style: {
                        textOutline: false,
                    },
                    enabled: true,
                },
                minPointLength: 3,
            }
        },
       
        series:[
            {
                type: 'column',
                // name: 'Total Return Net',
                // disable legend
                data:[
                    {
                        name: 'Losses',
                        y: +lossesPercantage.toFixed(2),
                        drilldown: 'Losses',
                        color: {
                            linearGradient: {x1: 0,x2: 0,y1: 0,y2: 1},
                            stops: [[0, '#ff3b3b'],[1, '#ff8282']]   
                        },                
                        startDate:data?.initialDate,
                        dataLabels: {
                            useHTML: true,
                            enabled: true,
                            style: {
                                textOutline: false,
                                textDecoration: 'none',
                            },
                            formatter: function() {
                                return `<span style="font-family: Roboto; color:black font-weight: 600; font-size: 14px;">${this.point.y}%</span>`;
                            }
                        },
                    },
                    {
                        name: 'Wins',
                        y: +winsPercantage.toFixed(2),
                        drilldown: 'Wins',
                        color: {
                            linearGradient: {x1: 0,x2: 0,y1: 0,y2: 1},
                            stops: [[0, '#3dee90'],[1, '#00bd96']]
                        },
                        startDate:data?.initialDate,
                        dataLabels: {
                            useHTML: true,
                            enabled: true,
                            style: {
                                textOutline: false,
                                textDecoration: 'none',
                            },
                            formatter: function() {
                                return `<span style="font-family: Roboto; color:black font-weight: 600; font-size: 14px;">${this.point.y}%</span>`;
                            }
                        },
                        
                    },
                ],
            },
        ],
        drilldown: {
            series:[
                {
                    id:'Losses',
                    name: 'Losses',
                    data: [{y:+(lossesShort.toFixed(2)), label:'Short'}, {y:+(lossesLong.toFixed(2)), label:'Long'}],
                    type: 'column',
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return `<span style="font-family: Roboto; color:#27313A font-weight: 600; font-size: 14px;">${this.point.y}%</span>`;
                        }
                    }
                },
                {
                    id:'Wins',
                    name: 'Wins',
                    data: [{y:+(winsShort.toFixed(2)), label:'Short'}, {y:+(winsLong.toFixed(2)), label:'Long'}],
                    type: 'column',
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return `<span style="font-family: Roboto; color:#27313A font-weight: 600; font-size: 14px;">${this.point.y}%</span>`;
                        }
                    },
                },
            ],
        },
    };


    return (
        <Container>

            <HighchartsReact
                highcharts={Highcharts}
                ref={chartRef}
                options={options}
            />
        </Container>
    );
};

export default memo(WinLostChart);
