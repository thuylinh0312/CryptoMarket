import React, {useEffect, useState} from 'react'
import {View, StyleSheet, FlatList, ActivityIndicator, Text} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux'
import { addMoreNews } from '../../actions/coinListAction';
import { resetNews } from '../../actions/coinListAction';
import { addMoreNewsId } from '../../actions/coinListAction';
import { NewsListItem } from './components/NewsListItem';
import SelectList from 'react-native-dropdown-select-list'

const ExploreScreen = () => {
  const dispatch = useDispatch() 
  const list = useSelector(state => {
    return state.coinListOption.partList
  })
  const [selected, setSelected] = useState(0);
  const arr = list.map(e => {
    return {
        key: e.id,
        value: e.name
    }
  })
  const data = [{key: 0 , value: "All Coins"}].concat(arr)
  useEffect(() => {
    selected !== 0 ? dispatch(addMoreNewsId(selected, 1)) : dispatch(addMoreNews(1))
    return () => {
      dispatch(resetNews())
    };
  }, [selected]) 

  const {listNews, listNewsId} = useSelector(state => {
    return state.newsList
  })

  const listData = selected === 0 ? listNews : listNewsId
  const ItemDivider = () => {
    return (
      <View style={styles.divider}/>
    );
  }
  return (
    <View style={styles.container}>
      <View style ={styles.search}>
        <SelectList 
        setSelected={setSelected} 
        data={data}  
        boxStyles = {styles.dropdown}
        placeholder = "All Coins"
        arrowicon={<Icon name="down" size={20} color="black"/>} 
        />
      </View>
      {listData.length === 0 ? <ActivityIndicator /> : (
        <FlatList
          keyExtractor={(item) => item.meta.id}
          data={listData ?? []}
          renderItem={({item, index}) => { 
            return (
              <View style = {styles.item}>
                <NewsListItem item={item} />
              </View>                
            )     
          }}
          ItemSeparatorComponent={ItemDivider}
          ListFooterComponent = {<ActivityIndicator size="small" />}
          onEndReached = {() => {
            selected === 0 ? dispatch(addMoreNews(listData.length/20 + 1)) :  dispatch(addMoreNewsId(selected, listData.length/20 + 1));
          }}
        />
      )}
    </View>
  )
}

export default ExploreScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  search: {
    marginTop: 10,
    marginBottom: 25
  },
  dropdown:{
    backgroundColor: "lightgray",
    borderColor: "lightgray", 
    padding:2, 
    alignItems: "center",
    marginHorizontal: 5
  },
  divider: { 
    width: "100%",
    backgroundColor: "lightgray",
    marginBottom: 10,
    
  }
});
