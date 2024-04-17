import React, {memo, useEffect, useRef, useState} from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more'
import HC_patternFill from 'highcharts-pattern-fill';
import HighchartVaryWide from 'highcharts/modules/variwide';
import moment from 'moment-timezone';
import {useDispatch, useSelector} from 'react-redux';
import { Container } from './cumulative_chart_big.style';


HC_patternFill(Highcharts);
HC_more(Highcharts);
HighchartVaryWide(Highcharts);
Highcharts.AST.allowedReferences.push('data:');
const AccChart = ({data}) => {
    const chartRef = useRef(HighchartsReact.RefObject);
    const containerRef = useRef();

    const dispatch = useDispatch();

    const { cards } = data;

    const xAxisCategories = cards.map((item) => moment(item.date).format('DD/MM'));
    
    const average = cards.reduce((prev, next) => prev + next.y, 0) / cards.length;
    const maxValue = Math.max(...cards.map((item) => item.y));
    const minValue = Math.min(...cards.map((item) => item.y));
    
    const options = {
        chart: {
            reflow: true,
            renderTo: 'container',
            height:600
        },
        credits: {
            enabled: false
        },
        tooltip: {
            useHTML: true,
            formatter: function() {
                const isSuccessful = this.point.profitLoss > 0;
                return `<div style="font-family: Roboto;  font-size: 12px; color: #000000; text-align: center; 
                            padding: 5px 10px; border-radius: 5px; border: 1px solid #74C86A; background-color: #FFFFFF;
                            box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25); display: flex; flex-direction: column; justify-content: center; align-items: center; gap:10px">
                            <p><span style="font-weight: bold;">Date: </span>${moment(this.x).format('MM/DD/YYYY')}</p>
                            <p><span style="font-weight: bold;">${isSuccessful ? 'Profit': 'Loss'}:</span> $${this.point.profitLoss}</p>
                            <p><span style="font-weight: bold;">Net:</span> $${this.y}</p>
                            </div>`;
                        }
        },
        xAxis: {
            type: 'category',
            categories: xAxisCategories,
            labels: {
                useHTML: true,
                formatter: function () {
                    return `<div style="font-family: Roboto; font-weight: 600; font-size: 12px; color: black;">${this.value}</div>`;
                },
            },
            crosshair: {
                width: 1,
                color: '#74C86A',
                dashStyle: 'Dash'
            },
            title: {
                text:'<span style="font-family: Roboto">' + 'Date' +'</span>',
                style: {
                    fontWeight: 'bold',
                    fontSize: '12px',
                    whiteSpace: 'nowrap'
                }
            },
        },
        legend:{
            enabled: false,
        },
        title: {
            text:'<span style="font-family: Roboto">' + 'Total Return Net' +'</span>',
        },
        yAxis: [
            {
                title: {
                    text:    '<span style="font-family: Roboto;">' + 'Accumulated Return' + '</span>',
                    // x: 5,
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
            series:{
                fillOpacity: 0.1,
                marker: {
                    enabled: true,
                    symbol: 'circle',
                    radius: 3,
                    states: {
                        hover: {
                            enabled:false
                        }
                    }
                },
                lineWidth: 3,
            },
            
        },
        series: [
            {
                type: 'areaspline',
                data: cards,
                zones: [
                    {
                        value:minValue,
                        color: '#ff6968',
                        fillColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [
                            [0, "rgba(255, 105, 104, 0)"],
                            [1, "rgba(255, 105, 104, 0.3)"],
                            ],
                        },
                        threshold: Infinity,
                    },
                    {
                        value: average,
                        color: '#ffff4e',
                        fillColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [
                            [0, "rgba(255, 255, 78, 0.3)"],
                            [1, "rgba(255, 255, 78, 0)"],
                            ],
                        },
                    }, 
                    {
                        color: '#94caae',
                        fillColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [
                            [0, "rgba(34, 197, 94, 0.3)"],
                            [1, "rgba(34, 197, 94, 0)"],
                            ],
                        }
                    },
                
            ]},
        ]
    };


    return (
        <Container>

            <HighchartsReact
                ref={chartRef}
                highcharts={Highcharts}
                options={options}
            />
        </Container>
    );
};

export default memo(AccChart);
