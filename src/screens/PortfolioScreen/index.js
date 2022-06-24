// import React from 'react'
// import {View, Text} from 'react-native'

// const PortfolioScreen = () => {
//   return (
//     <View style={{flex: 1}}>
//       <Text>Portfolio Screen</Text>
//     </View>
//   )
// }

// export default PortfolioScreen
import React, {useState} from 'react'
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Modal} from 'react-native'

var DATA = [
  {id: "tt1", title: "My Watchlists"},
  {id: "tt2", title: "USD"},
  {id: "tt3", title: "Sort by Rank"},
  {id: "tt4", title: "%(24h)"},
  {id: "tt5", title: "All Cryptocurrencies"},
];

const PortfolioScreen = () => {
  const [modal, setModal] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.top}>
  
        <FlatList
          data={DATA}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity 
                onPress={()=>{
                  setModal(!modal)
                }}
                key={item.id}
              >
                <Text style={styles.title}>{item.title}</Text>
              </TouchableOpacity>              
            )     
          }}
        />
        

      </View>
      

      <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modal);

          }}
        >
<Text>dfdfsd</Text>
      </Modal>

      {/* <View style ={{flex: 1, backgroundColor: "red"}}>
        
      </View> */}
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

export default PortfolioScreen