import React, { useEffect} from 'react'
import {StyleSheet, View, processColor} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {LineChart, BarChart, CandleStickChart} from 'react-native-charts-wrapper';
import { setDisplayPrice } from '../../../actions/coinListAction';
import { setDisplayTime } from '../../../actions/coinListAction';

export const ChartCoinList = React.memo(({listValue, displayVolume, togglePrice}) => {
    const dispatch = useDispatch() 
    const title = useSelector(state => {
        return state.chartList.value
    })
    const volume = Object.values(listValue).map(x => x.USD[1]);
    const values = Object.keys(listValue).map(e => {
        return {
            x: new Date(e).getTime(),
            y: togglePrice ? listValue[e].USD[0] : listValue[e].BTC[0]
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
        <LineChart style={{flex: 8, marginBottom: 7}}
            onSelect = {(event) => {
                dispatch(setDisplayPrice(event.nativeEvent.y))
                dispatch(setDisplayTime(new Date(event.nativeEvent.x).toString().slice(0,21)))
            }}
            legend = {{enabled: false}}           
            data={{dataSets:[
            {
            label: "price", 
            values: values,
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
  )
})

const styles = StyleSheet.create({
    top: {
        paddingHorizontal: 10,
        marginTop: 15,
        marginBottom: 15
    },

});