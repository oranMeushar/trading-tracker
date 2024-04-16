import React, {memo, useEffect, useLayoutEffect, useRef, useState} from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more'
import HC_patternFill from 'highcharts-pattern-fill';
import HighchartVaryWide from 'highcharts/modules/variwide';
import moment from 'moment-timezone';
import {useDispatch, useSelector} from 'react-redux';
import { ChartWrapper, Header } from './perCompanyChart.style';
import HighchartsStock from 'highcharts/highstock';
import drilldown from 'highcharts/modules/drilldown.js';
// HC_patternFill(Highcharts);
// HC_more(Highcharts);
// HighchartVaryWide(Highcharts);
// Highcharts.AST.allowedReferences.push('data:');

const PerCompanyChart = ({data, width, height}) => {
    const chartRef = useRef(HighchartsReact.RefObject);
    const {allProfits, allLosses, categories} = data;

    const options = {
        chart: {
            reflow: true,
            renderTo: 'container',
            // alignTicks: false,
            // animation:false,
            height:200,
            width:0.44*width,
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
            shared: true,
            formatter: function() {
                    let a = this;
                    return `<div style="font-family: Roboto;  font-size: 12px; color: #000000; text-align: center; 
                    padding: 5px 10px; border-radius: 5px; border: 1px solid #74C86A; background-color: #FFFFFF;
                    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25); display: flex; flex-direction: column; justify-content: center; align-items: center; gap:10px">
                    <p><span style="font-weight: bold;">Since: </span>${moment(this.point.options.startDate).format('DD/MM/YYYY')}</p>
                    <p><span style="font-weight: bold;">${this.key === 'win' ? 'Profit' : this.key === 'loss' ? 'Loss' : 'Average'}:</span> $${this.y}</p>
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
                        return  `<div style="font-family: Roboto; font-weight: 600; font-size: 12px; color: black">$${this.value}</div>`;
                    }
                },
                tickAmount: 6,
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
                    // inside: true,
                    align: 'center',
                    // verticalAlign: 'middle',
                    // rotation:-90,
                    style: {
                        textOutline: false,
                    },
                    formatter: function () {
                        return  `<div style="font-family: Roboto; font-size: 9px;">$${this.y}</div>`;
                    }
                },
            },
        },
       
        series:[
            {
                type: 'column',
                name: 'Profits',
                data: allProfits,
                color:{linearGradient: {x1: 0,x2: 0,y1: 0,y2: 1},stops: [[0, '#3dee90'],[1, '#00bd96']]},
                minPointLength: 4,
                groupPadding: 0.35,
                // pointWidth: 30,
        
            }, {
                type: 'column',
                name: 'Losses',
                data: allLosses,
                color:{linearGradient: {x1: 0,x2: 0,y1: 0,y2: 1},stops: [[0, '#ff6b6b'],[1, '#ee3f3f']]},
                minPointLength: 4,
                groupPadding: 0.35,
                // pointWidth: 30,
            }
        ],
    };


    return (
        <ChartWrapper>
            <Header>
                <p>Performance Per Company</p>
                <p>Last: N days</p>
            </Header>
            <HighchartsReact
                highcharts={Highcharts}
                ref={chartRef}
                options={options}
            />
        </ChartWrapper>
    );
};

export default memo(PerCompanyChart);
