import React from 'react'
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import { setValue } from '../../../actions/coinListAction';

export const TimeTitle = React.memo(({title}) => {
    const dispatch = useDispatch() 
    const value = useSelector(state => {
        return state.chartList.value
    })

return (
    <View>
        <TouchableOpacity onPress={() =>  dispatch(setValue(title))}>
            <Text style={value === title ? styles.text2 : styles.text1}>{title}</Text>
        </TouchableOpacity>  
    </View>
  )
})

const styles = StyleSheet.create({
    text1:{
        fontSize: 12 , 
    },
    text2:{
        fontSize: 15, 
        fontWeight:"bold",
    },

});