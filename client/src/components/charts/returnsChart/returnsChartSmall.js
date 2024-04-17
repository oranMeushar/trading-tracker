import React, {memo, useEffect, useRef, useState} from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more'
import HC_patternFill from 'highcharts-pattern-fill';
import HighchartVaryWide from 'highcharts/modules/variwide';
import { Container } from './returnsChartSmall.style';
import drilldown from 'highcharts/modules/drilldown.js';
import {formatNumber} from '../../../utils/utils';

HC_patternFill(Highcharts);
HC_more(Highcharts);
HighchartVaryWide(Highcharts);
Highcharts.AST.allowedReferences.push('data:');

const AccChart = ({data, height, width}) => {
    const chartRef = useRef(HighchartsReact.RefObject);
    const containerRef = useRef();

    const negativeAccNet = data?.negativeAccNet?.reduce((acc, curr) => acc + curr.y, 0) || 0
    const positiveAccNet = data?.positiveAccNet?.reduce((acc, curr) => acc + curr.y, 0) || 0;
    const avgReturn = data?.avgReturn || 0;
    drilldown(Highcharts);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.chart.reflow();
        }
    }, [width, height]);


    const options = {
        chart: {
            spacing: [4, 0, 4, 0],
            reflow: false,
            height: 100,
            width: width - 0.25*width,
            marginLeft: 20,
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
            visible: false,
        },
        legend:{
            align: 'right',
            verticalAlign: 'top',
            layout: 'vertical',
            x: 6,
            rtl: true,
            itemStyle: {
                fontSize: '11px',
                fontFamily: 'Roboto',
                lineHeight: '13px',
            },
        },
        yAxis: [{
            title: null,
            labels: {
                enabled: false,
                useHTML: true,
                distance: -14,
                formatter: function () {
                    return  `<div style="font-family: Roboto; font-weight: 600; font-size: 11px; color: black">$${this.value}</div>`;
                }
            },
        }],
        plotOptions: {
            column: {
                pointWidth: 23,
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
                    // inside: true,
                    align: 'center',
                    // verticalAlign: 'middle',
                    // rotation:-90,
                    style: {
                        textOutline: false,
                    },
                    formatter: function () {
                        return  `<div style="font-family: Roboto; font-size: 9px;">$${formatNumber(this.y)}</div>`;
                    }
                },
            },
        },

        series: [
            {
                type: 'column',
                name:'Avg',
                color: '#ffff62',
                data:[{
                    name: 'Avg',
                    y: Math.abs(+avgReturn?.toFixed(2)),
                    color: {linearGradient: {x1: 0,x2: 0,y1: 0,y2: 1},stops: [[0, '#ffff62'],[1, '#ffff86']]}
                }],
                groupPadding: 0,
                minPointLength: 2,
                dataLabels: {
                    formatter: function () {
                        return  `<div style="font-family: Roboto; font-size: 9px;">$${formatNumber(avgReturn)}</div>`;
                    }
                },
            },
            {
                type: 'column',
                name: 'Loss',
                color: '#ff8282',
                data:[{
                        name: 'Loss',
                        y: negativeAccNet,
                        color: {linearGradient: {x1: 0,x2: 0,y1: 0,y2: 1},stops: [[0, '#ff3b3b'],[1, '#ff8282']]}                     
                }],
                groupPadding: 0.1,
                minPointLength: 2,
            },
            {
                type: 'column',
                name: 'Win',
                color: '#00bd96',
                data:[{
                    name: 'Win',
                    y: positiveAccNet,
                    color: {linearGradient: {x1: 0,x2: 0,y1: 0,y2: 1},stops: [[0, '#3dee90'],[1, '#00bd96']]}
                }],
                groupPadding: -0.1,
                minPointLength: 2,
            }
        ]
    };


    return (
        <Container>
            <HighchartsReact
                key={(negativeAccNet + positiveAccNet) || 1}
                ref={chartRef}
                highcharts={Highcharts}
                options={options}
            />
        </Container>
    );
};

export default memo(AccChart);
