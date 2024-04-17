import React, {memo, useEffect, useRef, useState} from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more'
import HC_patternFill from 'highcharts-pattern-fill';
import HighchartVaryWide from 'highcharts/modules/variwide';
import moment from 'moment-timezone';
import {useDispatch, useSelector} from 'react-redux';
import { Container } from './cumulative_chart_small.style';

HC_patternFill(Highcharts);
HC_more(Highcharts);
HighchartVaryWide(Highcharts);
Highcharts.AST.allowedReferences.push('data:');

const AccChart = ({data, height, width}) => {
    const chartRef = useRef(HighchartsReact.RefObject);

    const { cards } = data;

    const xAxisCategories = cards.map((item) => moment(item.date).format('DD/MM'));
    
    const average = cards.reduce((prev, next) => prev + next.y, 0) / cards.length;
    const maxValue = Math.max(...cards.map((item) => item.y));
    const minValue = Math.min(...cards.map((item) => item.y));

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.chart.reflow();
        }
    }, [width, height]);
    
    const options = {
        chart: {
            spacing: [0, 0, 0, 0],
            reflow: true,
            height: 100,
            width: width - 0.25*width,
            backgroundColor:'#f3f2ef',
        },
        credits: {
            enabled: false
        },
        tooltip: {
            enabled: false,
        },
        title: {
            text: null
        },
        xAxis: {
            type: 'category',
            categories: xAxisCategories,
            // visible:false,
            labels: {
                formatter: function() {
                        return '<span style="font-family: Roboto; color:#27313A font-weight: 600; font-size: 10px;">' + this.value + '</span>';
                }
            },
        },
        legend:{
            enabled: false,
        },
        yAxis: [
            {
                visible: false,
                max: maxValue,
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
                data:cards,
                zones: [
                    {
                        value:minValue,
                        color: '#ff6968',
                        fillColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [[0, "rgba(255, 105, 104, 0)"], [1, "rgba(255, 105, 104, 0.3)"]],
                        },
                        threshold: Infinity,
                    },
                    {
                        value: average,
                        color: '#ffff4e',
                        fillColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [[0, "rgba(255, 255, 78, 0.3)"],[1, "rgba(255, 255, 78, 0)"]],
                        }
                    }, 
                    {
                        color: '#94caae',
                        fillColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [[0, "rgba(34, 197, 94, 0.3)"],[1, "rgba(34, 197, 94, 0)"]],
                        }
                    },
                ]
            },
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
