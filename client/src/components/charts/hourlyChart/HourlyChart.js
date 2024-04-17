import React, {memo, useEffect, useLayoutEffect, useRef, useState} from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import moment from 'moment-timezone';
import { ChartWrapper, Header } from './HourlyChart.style';


const HourlyChart = ({title, data, width, height}) => {
    const chartRef = useRef(HighchartsReact.RefObject);
    const {trades, categories} = data;
    
    const options = {
        chart: {
            reflow: true,
            renderTo: 'container',
            // alignTicks: false,
            // animation:false,
            height:280,
            // width:0.44*width,
            // marginTop: 15,
            backgroundColor:'#f3f2ef',

            events: {
                redraw: function (e) {
                    // run on series
                    // for(let i=0; i<this.series.length; i++){
                    //     if (this.series[i].data.length < 4) {
                    //         this.series[i].options.pointWidth = 30;
                    //         this.series[i].redraw();
                    //     }
                    // }

                    // if (this.series[0].data.length < 4) {
                    //     this.series[0].options.pointWidth = 50;
                    //     this.series[0].redraw();
                    // }
                }
            }
        },
        credits: {
            enabled: false
        },
        tooltip: {
            useHTML: true,
            formatter: function() {
                let a = this
                // debugger
                    return `<div style="font-family: Roboto;  font-size: 12px; color: #000000; text-align: center; 
                    padding: 5px 10px; border-radius: 5px; border: 1px solid #74C86A; background-color: #FFFFFF;
                    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25); display: flex; flex-direction: column; justify-content: center; align-items: center; gap:10px">
                    <p><span style="font-weight: bold;">Total Profit: </span>$${this.y}</p>
                    <p><span style="font-weight: bold;">Total Lots: </span>${this.point.options.lots}</p>
                    </div>`;
                
            }

        },
        xAxis: {
            type: 'category',
            categories: categories,
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
                        return  `<div style="font-family: Roboto; font-weight: 600; font-size: 12px; color: black">${this.value}</div>`;
                    }
                },
            },
        ],
        plotOptions: {
            column: {
                borderWidth: 0,
                allowPointSelect: false,
                events: {
                    legendItemClick: function () {
                        return false; 
                    }
                },
                states: {
                    hover: {enabled: false},
                    inactive: {enabled: false},
                    select: {enabled: false}
                },
                dataLabels: {
                    enabled: true,
                    align: 'center',
                    style: {
                        textOutline: false,
                    },
                    formatter: function () {
                        return  `<div style="font-family: Roboto; font-size: 10px;">$${this.y}</div>`;
                    }
                },
            },
        },
       
        series:[
            {
                type: 'column',
                name: 'Wins',
                data:trades,
                // color:{linearGradient: {x1: 0,x2: 0,y1: 0,y2: 1},stops: [[0, '#3dee90'],[1, '#00bd96']]},
                minPointLength: 2,
                // groupPadding: 0.29     ,
                pointWidth: 22,
        
            }
        ],
    };


    return (
        <ChartWrapper>
            <Header>
                <p>{title}</p>
            </Header>
            <HighchartsReact
                highcharts={Highcharts}
                ref={chartRef}
                options={options}
            />
        </ChartWrapper>
    );
};

export default memo(HourlyChart);
