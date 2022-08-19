import React, {useEffect, useRef, useState, useMemo} from 'react'
import {ActivityIndicator, View, FlatList, StyleSheet} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import { fetchCoinList } from '../../actions/coinListAction'
import { toggleCurrency } from '../../actions/coinListAction'
import { CoinListItem } from './components/coinListItem'
import { HeaderOptions } from './components/HeaderOptions'
import { OptionModal } from './components/OptionModal'
import { Header } from './components/Header'
import { fetchFavoriteList } from '../../actions/coinListAction'
import { addFavoriteList } from '../../actions/coinListAction'
import { deleteFavoriteList } from '../../actions/coinListAction'
import { addList } from '../../actions/coinListAction'
import Lottie from 'lottie-react-native';

const CoinListScreen = ({navigation}) => {
  
  const modalRef = useRef(null)
  const dispatch = useDispatch() 
  const {sortDir: sortValue, list: fullList, partList: list} = useSelector(state => {
    return state.coinListOption
  })
  const sortBy = useSelector(state => {
    return state.coinListOption.data[1].title
  })
  const {favorite: favoriteList, favList: toggle} = useSelector(state => {
    return state.favoriteList
  })
 
  const type = useSelector(state => {
    return state.coinListOption.data[3].title
  })
  const sortList = useMemo(() => {
    const cloneList = !toggle ? [...list] :  [...fullList]
    switch(sortBy){
      case "Sort by Rank":
        return cloneList
      case "Sort by %":
        return cloneList.sort((a, b) => a.quote.BTC.percent_change_24h - b.quote.BTC.percent_change_24h);
      case "Sort by MC":
        return cloneList.sort((a, b) => a.quote.BTC.market_cap - b.quote.BTC.market_cap);
      case "Sort by Vol (24h)":
        return cloneList.sort((a, b) => a.quote.BTC.volume_24h - b.quote.BTC.volume_24h);
      case "Sort by C. Supply":
        return cloneList.sort((a, b) =>a.circulating_supply - b.circulating_supply);
      case "Sort by Price":
        return cloneList.sort((a, b) => a.quote.BTC.price - b.quote.BTC.price);
      case "Sort by Name":
        return cloneList.sort((a, b) => a.name.localeCompare(b.name))
    }
  })
  

  const arr = useMemo(() => {
    const displayList = !toggle ? sortList : sortList.filter(value => favoriteList.includes(value.id))
    switch(type){
      case "All Cryptocurrencies":
        return displayList
      case "Coins":
        return displayList.filter(e => {return e.platform === null})
      case "Tokens":
        return displayList.filter(e => {return e.platform !== null})
    }
  })

  const array = useMemo(() => {
    switch(sortValue){
      case "desc":
        return arr
      case "asc":
        return [...arr].reverse()
    }
  })
  useEffect(() => {
    dispatch(fetchCoinList())
    dispatch(fetchFavoriteList())
  }, []) 


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
      {array.length === 0 ? 
        <Lottie 
          style = {styles.lottie}
          source={require('../../../assets/lotties/98877-search.json')} 
          autoPlay loop 
        />
        : 
        (
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={ array  ?? []}
            renderItem={({item, index}) => { 
              return (
                <View style = {styles.item}>
                  <CoinListItem navigation = {navigation} item={item} onFavourite={() => {
                    if (favoriteList.includes(item.id)){
                      dispatch(deleteFavoriteList(item.id))
                    }else{
                      dispatch(addFavoriteList(item.id))
                    }
                  }} />
                </View>                
              )     
            }}
            ItemSeparatorComponent={ItemDivider}
            
            ListFooterComponent = {toggle ? null : <ActivityIndicator size="small" />}
            onEndReached = {() => {
              dispatch(addList(list.concat(fullList.slice(list.length, list.length + 20))))
            }}
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
    width: "100%",
    backgroundColor: "lightgray" 
  },
  lottie: {
    width: 300, 
    height: 300, 
    alignSelf: "center", 
    marginTop: 30
  }

});
export default CoinListScreen
