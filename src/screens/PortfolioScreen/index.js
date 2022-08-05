import React from 'react'
import {View, Text, AppRegistry, StyleSheet, processColor} from 'react-native'
import {LineChart, BarChart, CandleStickChart} from 'react-native-charts-wrapper';
import {useSelector, useDispatch} from 'react-redux'

const PortfolioScreen = () => {
  const listValue = useSelector(state => {
    return state.chartList.listValue
  })
  const price = listValue.map(x => x.USD[0]);
  // const btc = listValue.map(x => x.BTC[0]*23750.53);
  console.log("price", price)
  console.log("btc", btc)
  return (
    <View style = {{flex: 1}}>

      {/* <Text>Portfolio Screen</Text> */}
      <LineChart style={styles.chart}
        data={{dataSets:[
          {
          label: "usd", 
          values: price,
          config: {
            drawCircles: false,
            drawValues: false,
            lineWidth: 3,
            color: processColor("#0000ff"),
          }
        },
        // {
        //   label: "btc", 
        //   values:  btc,
        //   config: {
        //     drawCircles: false,
        //     drawValues: false,
        //     lineWidth: 3,
        //     color: processColor("#ff8c00"),
        //   }
        // }
        ]}}
        xAxis={{ drawGridLines: false ,
          drawLabels: false,
          enabled:       false,
        }}
        yAxis= {{
          left:  {
            drawGridLines: true,
            enabled:       true,
            drawLabels:    false,
            drawAxisLine:  true,
          },
          right: {
            enabled:       false,
            drawLabels:    false,
            drawAxisLine:  true,
            drawGridLines: false,
          }
          }}
        chartDescription={{ text: '' }}
        
      />
      {/* <BarChart style={styles.chart}
        data={{dataSets:[{
          label: "price", 
          values: [1.000838150972,  0.928258691,0.994529953, 0.9999987609435738, 0.943, 0.999877054],
          config: {
            drawCircles: false,
            drawValues: false,
            lineWidth: 3,
            color: processColor("#a9a9a9"),
          }
        }
        ]}}
        xAxis={{ 
          // drawGridLines: false ,
          // drawLabels: false,
          enabled: false,
        }}
        yAxis= {{
          left:  {
            // drawGridLines: true,
            enabled:       false,
            // drawLabels:    false,
            // drawAxisLine:  true,
          },
          right: {
            enabled:       false,
            // drawLabels:    false,
            // drawAxisLine:  true,
            // drawGridLines: false,
          }
          }}
        chartDescription={{ text: '' }}
      
      /> */}
    </View>
    

  )
}

export default PortfolioScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
});