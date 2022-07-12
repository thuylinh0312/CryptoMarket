import React, {useEffect, useRef, useState} from 'react'
import {ActivityIndicator, View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import { fetchCoinList } from '../../actions/coinListAction'
import { toggleCurrency } from '../../actions/coinListAction'

import { CoinListItem } from './components/coinListItem'
import { HeaderOptions } from './components/HeaderOptions'
import { OptionModal } from './components/OptionModal'
import { Header } from './components/Header'
import { ApiUtil } from '../../configs/ApiConfig'

const CoinListScreen = ({navigation}) => {
  const modalRef = useRef(null)
  const dispatch = useDispatch() 
  const list = useSelector(state => {
      return state.coinList.list
  })

  const sortSaga = useSelector(state => {
      return state.coinListOption
  })

  const getCoinList = async () => { dispatch(fetchCoinList(sortSaga)) }

  useEffect(() => {
      getCoinList()
      ApiUtil.callApi({url: 'app/get-favourites', method: 'GET'}).then(data => console.log('dataaaaa fetch', data.data))
  }, [sortSaga.sortValue, sortSaga.type, sortSaga.sortDir]) 

  const ItemDivider = () => {
    return (
      <View style={styles.divider}/>
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
      <Header navigation = {navigation}/>
      <HeaderOptions onPressOption={(id) => checkId(id)} />
      {list.length === 0 ? <ActivityIndicator /> : (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={list ?? []}
          renderItem={({item, index}) => { 
            return (
              <View style = {styles.item}>
                <CoinListItem item={item} onFavourite={() => {
                  // call Api add favourite
                  ApiUtil.callApi({url: 'app/add-favourite', method: 'POST', data: {coin_id: item.id}}).then(data => console.log('dataaaaaa', data))
                }} />
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
  item: {
    paddingTop: 8, 
    paddingBottom: 8
  },
  divider: {
    eight: 1, 
    width: "100%",
    backgroundColor: "lightgray" 
  }

});
export default CoinListScreen
