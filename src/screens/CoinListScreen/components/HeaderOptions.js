import React, { useEffect, useMemo } from 'react'
import {StyleSheet, View, FlatList, TouchableOpacity, Text} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import Icon from 'react-native-vector-icons/AntDesign';
import { toggleIconSort } from '../../../actions/coinListAction';

export const HeaderOptions = React.memo(({onPressOption}) => {
  const dispatch = useDispatch() 
  const title = useSelector(state => {
    return state.coinListOption.data
  })
  const iconSort = useSelector(state => {
    return state.coinListOption.sortDir
  })
  const nameIcon = useMemo(() => {
    switch(iconSort){
      case "desc":
        return "arrowup"
      case "asc":
        return "arrowdown"
    }
  })

  return (
    <View style={styles.top}>
        <FlatList 
          contentContainerStyle= {{alignItems: "center"}}
          ListHeaderComponent={ <Icon style={styles.favorite} name="staro" size={15} color={ "black"}/>}
          keyExtractor={(item) => item.id.toString()}
          data={title}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity style ={styles.list} onPress={() => onPressOption(item.id)}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity onPress={() => dispatch(toggleIconSort() )}>
                  {item.id === "tt2" ? <Icon style={styles.arrow} name = {nameIcon} size={15} color={ "black"}/> : null}
                </TouchableOpacity> 
              </TouchableOpacity>              
            )     
          }}
          horizontal 
        />
      </View>
  )
})

const styles = StyleSheet.create({
  top: {
    paddingHorizontal: 10,
    marginTop: 15,
    marginBottom: 15
  },
  list: {
    flexDirection: "row", 
    backgroundColor: "lightgray",
    margin:7, 
    padding: 5,  
    borderRadius: 20, 
    alignItems:"center"
  },
  title: {
    paddingHorizontal:20,
    fontSize: 10,
    fontWeight: "bold",
  },
  favorite:{
    backgroundColor:"lightgray", 
    padding:7, 
    borderRadius:50, 
    marginRight:5
  },
  arrow: {
    marginRight:8
  }

});