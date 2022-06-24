import React, {useEffect, useState} from 'react'
import {ActivityIndicator, View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import { fetchCoinList } from '../../actions/coinListAction'
import { CoinListItem } from './components/coinListItem'

var DATA = [
  {id: "tt1", title: "My Watchlists"},
  {id: "tt2", title: "USD"},
  {id: "tt3", title: "Sort by Rank"},
  {id: "tt4", title: "%(24h)"},
  {id: "tt5", title: "All Cryptocurrencies"},
];

const CoinListScreen = () => {
  const dispatch = useDispatch() 
  const list = useSelector(state => {
      return state.coinList.list
  })
  const getCoinList = async (start) => { 
      dispatch(fetchCoinList({start}))
  }

  useEffect(() => {
      getCoinList(1)
  }, []) 

  const ItemDivider = () => {
    return (
      <View style={{ height: 1, width: "100%",backgroundColor: "lightgray"}}/>
    );
  }

  const [selectedId, setSelectedId] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <FlatList

          data={DATA}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity 
                onPress={()=>setSelectedId(item.id)}
                key={item.id}
              >
                <Text style={styles.title}>{item.title}</Text>
              </TouchableOpacity>              
            )     
          }}
          horizontal 
        />
      </View>
      

      {list.length === 0 ? <ActivityIndicator /> : (
      <FlatList
        onEndReached={() => getCoinList(list.length + 1)}
        data={list ?? []} 
        renderItem={({item, index}) => {
          return (
            <View 
              style = {{paddingTop: 8, paddingBottom: 8}}
              key={item.id} 
            >
              <CoinListItem item={item} />
            </View>                
          )     
        }}
        ItemSeparatorComponent={ItemDivider}
        ListFooterComponent={<ActivityIndicator />}
      />
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    paddingHorizontal: 10,
    marginTop: 15,
    marginBottom: 15
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    margin:7,
    padding: 5,
    paddingHorizontal:20,
    fontSize: 10,
    fontWeight: "bold",
    backgroundColor: "lightgray",
    borderRadius: 20
  },
});
export default CoinListScreen
