import React, {memo, useEffect, useRef, useState} from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more'
import HC_patternFill from 'highcharts-pattern-fill';
import HighchartVaryWide from 'highcharts/modules/variwide';
import { Container } from './winLostCharSmall.style';
import drilldown from 'highcharts/modules/drilldown.js';

HC_patternFill(Highcharts);
HC_more(Highcharts);
HighchartVaryWide(Highcharts);
Highcharts.AST.allowedReferences.push('data:');

const WinLostChartMain = ({data, height, width}) => {
    const chartRef = useRef(HighchartsReact.RefObject);
    const containerRef = useRef();

    const {winsPercantage, lossesPercantage} = data;

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.chart.reflow();
        }
    }, [width, height]);

    drilldown(Highcharts);

    const options = {
        chart: {
            spacing: [4, 0, 4, 0],
            reflow: true,
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
            x: 4,
            rtl: true,
            itemStyle: {
                fontSize: '11px',
                fontFamily: 'Roboto',
                lineHeight: '13px',
            },
            
        },
        yAxis: [
            {
                max: 100,
                title: null,
                labels: {
                    enabled: false,
                    useHTML: true,
                    distance: -12,
                    formatter: function () {
                        return  `<div style="font-family: Roboto; font-weight: 600; font-size: 11px; color: black">${this.value}%</div>`;
                    }
                },
            },
        ],
        plotOptions: {
            allowPointSelect: false,
            borderWidth: 0,
            column: {
                pointWidth: 20,
                events: {
                    legendItemClick: function () {
                        return false; 
                    }
                },
                states: {
                    hover: {
                      enabled: false
                    },
                    inactive: {
                      enabled: false
                    },
                    select: {
                      enabled: false
                    }
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
                        return  `<div style="font-family: Roboto; font-size: 9px;">${this.y}%</div>`;
                    }
                },
            },
            
            
        },

        series: [
            {
                type: 'column',
                name: 'Loss',
                color: '#ff8282',
                data:[{
                        name: 'Loss',
                        y: +lossesPercantage?.toFixed(2),
                        color: {
                            linearGradient: {x1: 0,x2: 0,y1: 0,y2: 1},
                            stops: [[0, '#ff3b3b'],[1, '#ff8282']]   
                        }                     
                }],
                groupPadding: 0.2,
                minPointLength: 2,
            },
            {
                type: 'column',
                name: 'Win',
                color: '#00bd96',
                data:[{
                    name: 'Win',
                    y: +winsPercantage?.toFixed(2),
                    color: {
                        linearGradient: {x1: 0,x2: 0,y1: 0,y2: 1},
                        stops: [[0, '#3dee90'],[1, '#00bd96']]
                    }
                }],
                groupPadding: -0.3,
                minPointLength: 2,
            },
        ],
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

export default memo(WinLostChartMain);
