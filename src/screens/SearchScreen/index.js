import React, {useEffect} from 'react'
import {View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector, useDispatch} from 'react-redux'
import { changeSearchValue } from '../../actions/coinListAction'
import { CoinListSeach } from './components/CoinListSearch';


const SearchScreen = ({navigation}) => {
  const dispatch = useDispatch() 
  const searchValue = useSelector(state => {
      return state.searchList.searchValue
  })
  const list = useSelector(state => {
    return state.coinListOption.list
  })
  const listSearch = list.filter(e => e.name.toLowerCase().includes(searchValue) );

  const ItemDivider = () => {
    return (
      <View style={styles.divider}/>
    );
  }
  const onBack = () => {
    dispatch(changeSearchValue(""))
    navigation.goBack()
  }

  return (
    <View style = {styles.container}>
      <View style={styles.input}>
        <TextInput style={{flex:1}}
          placeholder = "Search"
          value = {searchValue}
          onChangeText = {(str) => dispatch(changeSearchValue(str))}
        />
          
        {searchValue === "" ? null : 
        <Icon onPress={() => {dispatch(changeSearchValue(""))}} style={{marginRight:15}} name="closecircle" size={18} color="lightgray"/>}
        <TouchableOpacity onPress={() => onBack()}>
          <Text style = {styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {searchValue === "" ? null : (
        <View>
        <FlatList
          keyExtractor={(item) => item.id.toString() + item.name}
          data={listSearch ?? []}
          renderItem={({item, index}) => { 
            return (
              <View style = {styles.item}>
                <CoinListSeach item={item} navigation = {navigation}/>
              </View>                
            )     
          }}
          ItemSeparatorComponent={ItemDivider}
        />
        {listSearch.length === 0 ?  <Text>No search results found.</Text> : null}
        </View>
      )}

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15
  },
  item: {
    paddingTop: 8, 
    paddingBottom: 8
  },
  input: {
    flexDirection: "row", 
    justifyContent:"center", 
    alignItems: "center"
  },
  cancel: {
    fontSize: 12, 
    color: "blue"
  },
  divider: {
    height: 1, 
    width: "100%",
    backgroundColor: "lightgray"
  }
});
export default SearchScreen
