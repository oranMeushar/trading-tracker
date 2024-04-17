import React, {memo, useEffect, useLayoutEffect, useRef, useState} from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more'
import HC_patternFill from 'highcharts-pattern-fill';
import HighchartVaryWide from 'highcharts/modules/variwide';
import moment from 'moment-timezone';
import {useDispatch, useSelector} from 'react-redux';
import { ChartWrapper, Header } from './dailyAvgChart.style';
// HC_patternFill(Highcharts);
// HC_more(Highcharts);
// HighchartVaryWide(Highcharts);
// Highcharts.AST.allowedReferences.push('data:');

const DailyAvgChart = ({data, width, height}) => {
    const chartRef = useRef(HighchartsReact.RefObject);
  
    const {avgReturn} = data;
    const xAxisCategories = avgReturn.map((item) => moment(item.date).format('DD/MM'));

    const options = {
        chart: {
            reflow: true,
            renderTo: 'container',
            // alignTicks: false,
            // animation:false,
            height:200,
            width: 0.44*width,
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
                    let a = this;
                    return `<div style="font-family: Roboto;  font-size: 12px; color: #000000; text-align: center; 
                    padding: 5px 10px; border-radius: 5px; border: 1px solid #74C86A; background-color: #FFFFFF;
                    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.25); display: flex; flex-direction: column; justify-content: center; align-items: center; gap:10px">
                    <p><span style="font-weight: bold;">Since: </span>${moment(this.point.options.startDate).format('DD/MM/YYYY')}</p>
                    <p><span style="font-weight: bold;">${this.key === 'win' ? 'Profit' : this.key === 'loss' ? 'Loss' : 'Average'}:</span> $${this.y}</p>
                    </div>`;
                }
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
            },
        },
       
        series:[
            {
                type: 'spline',
                // name: 'Total Return Net',
                data:avgReturn,
                zIndex: 10,
            },
        ],
    };


    return (
        <ChartWrapper>
            <Header>
                <p>Average Return</p>
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

export default memo(DailyAvgChart);
