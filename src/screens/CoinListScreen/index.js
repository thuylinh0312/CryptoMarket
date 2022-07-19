import React, {useEffect, useRef, useState} from 'react'
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

const CoinListScreen = ({navigation}) => {
  
  const modalRef = useRef(null)
  const dispatch = useDispatch() 
  const list = useSelector(state => {
    return state.coinList.list
  })
  const favoriteList = useSelector(state => {
    return state.favoriteList.favorite
  })
  const sortSaga = useSelector(state => {
    return state.coinListOption
  })

  const toggle = useSelector(state => {
    return state.favoriteList.favList
  })
  const displayList = !toggle ? list : list.filter(value => favoriteList.includes(value.id))
  useEffect(()=>{
    dispatch(fetchFavoriteList())
  },[])

  useEffect(() => {
    dispatch(fetchCoinList(sortSaga))
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
      {displayList.length === 0 ? <ActivityIndicator /> : (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={displayList ?? []}
          renderItem={({item, index}) => { 
            return (
              <View style = {styles.item}>
                <CoinListItem item={item} onFavourite={() => {
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
