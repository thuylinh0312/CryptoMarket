import React, { useEffect } from 'react'
import {StyleSheet, View, FlatList, TouchableOpacity, Text} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'


export const HeaderOptions = React.memo(({onPressOption}) => {
  const title = useSelector(state => {
    return state.coinListOption.DATA
  })
  return (
    <View style={styles.top}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={title}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => onPressOption(item.id)}
              >
                <Text style={styles.title}>{item.title}</Text>
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