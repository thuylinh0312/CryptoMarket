import React from 'react'
import {StyleSheet, View, FlatList, TouchableOpacity, Text} from 'react-native'


const DATA = [
  {id: "tt1", title: "My Watchlists"},
  {id: "tt2", title: "USD"},
  {id: "tt3", title: "Sort by Rank"},
  {id: "tt4", title: "%(24h)"},
  {id: "tt5", title: "All Cryptocurrencies"},
];

export const HeaderOptions = React.memo(({onPressOption}) => {
  //useSelector
  
  return (
    <View style={styles.top}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={DATA}
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