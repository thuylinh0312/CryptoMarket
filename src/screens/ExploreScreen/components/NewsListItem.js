import React from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native'
export const NewsListItem = ({item}) => {
    const openLink = (url) => {
        Linking.canOpenURL(url).then((supported) => {
            supported && Linking.openURL(url);
        })
    }
    return (
        <View>
            <View style = {styles.container}>
                <Image 
                    style={styles.image}
                    source={{uri: item.cover}}
                />
                <View style = {{flex: 7}}>
                    <TouchableOpacity onPress={() => openLink(item.meta.sourceUrl) }>
                        <Text style={styles.title}>{item.meta.title}</Text>
                    </TouchableOpacity>
                    <View style = {{flex: 1}}></View>
                    <View style = {{flexDirection: "row"}}>
                        <Text style={styles.text}>{item.meta.sourceName}</Text>
                        <View style = {{flex: 1}}></View>
                        <Text style={styles.text}>{item.createdAt.slice(5,10)}</Text>
                    </View>
                    
                </View>
                
            </View> 
        </View>
     
  )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "row",
        marginBottom: 5,
        paddingHorizontal: 10,
    },
    title:{
        fontSize: 11 , 
        fontWeight:"bold",
    },
    image: {
        flex: 3,
        width: 70, 
        height: 70, 
        marginRight: 15,
        borderRadius: 10,
        alignSelf: "center"
    },
    text:{
        fontSize: 9 , 
        color: "gray"
    },
    
})