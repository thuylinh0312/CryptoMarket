import React, {useEffect, useRef, useState} from 'react'
import {ActivityIndicator, View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import { fetchCoinList } from '../../actions/coinListAction'
import { resetCoinList } from '../../actions/coinListAction'
import { toggleCurrency } from '../../actions/coinListAction'

import { CoinListItem } from './components/coinListItem'
import { HeaderOptions } from './components/HeaderOptions'
import { OptionModal } from './components/OptionModal'

const CoinListScreen = () => {
  const modalRef = useRef(null)
  const dispatch = useDispatch() 
  const list = useSelector(state => {
      return state.coinList.list
  })

  const sortSaga = useSelector(state => {
      return state.coinListOption
  })
  
  const getCoinList = async (start) => { 
      dispatch(fetchCoinList({start},sortSaga)) 
  }

  useEffect(() => {
      getCoinList(1)
      return () => {
        console.log("unmount")
        dispatch(resetCoinList()) 
        // Function này được chạy khi screen bị unmount
        // Khi screen unmount thì mình nên gọi 1 action để xóa list coins
      }
  }, []) 

  const ItemDivider = () => {
    return (
      <View style={{ height: 1, width: "100%",backgroundColor: "lightgray"}}/>
    );
  }
  const checkId = (id) => {
    switch(id){
      case 'tt1':
        dispatch(toggleCurrency())
        break
      case 'tt2': case 'tt3' : case 'tt4' : 
        modalRef.current.open(id)
        break   
    
  }}
  return (
    <View style={styles.container}>
      <HeaderOptions onPressOption={(id) => checkId(id)} />
      {list.length === 0 ? <ActivityIndicator /> : (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          onEndReached={() => getCoinList(list.length + 1)}
          data={list ?? []}
          renderItem={({item, index}) => { 
            return (
              <View style = {{paddingTop: 8, paddingBottom: 8}}>
                <CoinListItem item={item} />
              </View>                
            )     
          }}
          ItemSeparatorComponent={ItemDivider}
          ListFooterComponent={<ActivityIndicator />}
        />
      )}
      <OptionModal ref={modalRef} />
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
