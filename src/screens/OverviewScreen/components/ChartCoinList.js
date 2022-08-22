import React, { useEffect} from 'react'
import {StyleSheet, View, processColor} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {LineChart, BarChart, CandleStickChart} from 'react-native-charts-wrapper';
import { setDisplayPrice } from '../../../actions/coinListAction';
import { setDisplayTime } from '../../../actions/coinListAction';

export const ChartCoinList = React.memo(({listValue, displayVolume, togglePrice, chart, listCandleChart}) => {
    const dispatch = useDispatch() 
    const title = useSelector(state => {
        return state.chartList.value
    })
    const volume = Object.values(listValue).map(x => x.USD[1]);
    const valuesLineChart = Object.keys(listValue).map(e => {
        return {
            x: new Date(e).getTime(),
            y: togglePrice ? listValue[e].USD[0] : listValue[e].BTC[0]
        }
    })
    const valuesCandleChart = listCandleChart.map(e => {
        if(togglePrice){
            return {
                shadowH: e.USD.high,
                shadowL: e.USD.low,
                open: e.USD.open, 
                close: e.USD.close,
            }
        }else{
            return {
                shadowH: e.BTC.high,
                shadowL: e.BTC.low,
                open: e.BTC.open, 
                close: e.BTC.close,
            }
        }    
    })
    useEffect(() => {
        return () => {
            dispatch(setDisplayPrice(0))
            dispatch(setDisplayTime(""))
        };
    }, []);



return (
    <View style = {{flex: 1}}>
        <View style = {{flex: 1}}>
            {chart ? 
                <LineChart style={styles.chartTop}
                    onSelect = {(event) => {
                        dispatch(setDisplayPrice(event.nativeEvent.y))
                        dispatch(setDisplayTime(new Date(event.nativeEvent.x).toString().slice(0,21)))
                    }}
                    legend = {{enabled: false}}           
                    data={{dataSets:[
                    {
                    label: "price", 
                    values: valuesLineChart,
                    config: {
                        drawCircles: false,
                        drawValues: false,
                        lineWidth: 3,
                        color:   processColor(togglePrice ? "#0000ff" : "#ff8c00")  ,
                    }
                    },

                    ]}}
                    xAxis={{ 
                        drawGridLines: false ,
                        valueFormatter: 'date',
                        valueFormatterPattern: title === "1h" || title === "24h" ? 'HH:mm' : 'MM/dd' ,
                        position: 'BOTTOM',
                    }}
                    yAxis= {{
                        left:  {
                            drawGridLines: true,
                            enabled: true,
                            drawLabels: false,
                            drawAxisLine:true,
                        },
                        right: {
                            enabled: false,
                            drawLabels: false,
                            drawAxisLine: true,
                            drawGridLines: false,
                        }
                    }}
                    chartDescription={{ text: '' }}
                />
            :
                <CandleStickChart 
                    style={styles.chartTop}
                    legend = {{enabled: false}}  
                    data={{dataSets:[{
                    label: "usd-btc", 
                    values: valuesCandleChart,
                    config: {
                        shadowColor: processColor('black'),
                        shadowWidth: 1,
                        shadowColorSameAsCandle: true,
                        increasingColor: processColor('#71BD6A'),
                        increasingPaintStyle: 'FILL',
                        decreasingColor: processColor('#D14B5A'),
                        drawValues: false,
                    },
                    xAxis: {},
                    yAxis: {}
                    }
                    ]}}
                    marker = {{
                        enabled: true,
                        markerColor: processColor('#2c3e50'),
                        textColor: processColor('white'),
                    }}
                    xAxis={{enabled: false}}
                    yAxis={{right: { enabled:false}}}
                    chartDescription={{ text: '' }}
                />
            }

            {displayVolume ?  null :
            <BarChart style={{flex: 2}}
                legend = {{enabled: false}}  
                data={{dataSets:[{
                label: "volume", 
                values: volume,
                config: {
                    drawCircles: false,
                    drawValues: false,
                    lineWidth: 3,
                    color: processColor("#a9a9a9"),
                }
            }
            ]}}
            xAxis={{ enabled: false }}
            yAxis= {{
                left:  { enabled: false},
                right: { enabled:false}
            }}
            chartDescription={{ text: '' }}
            />
            }
        </View>
     
    </View>
  )
})

const styles = StyleSheet.create({
    chartTop: {
        flex: 8, 
    },

});