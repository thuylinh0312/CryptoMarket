import React, {useEffect, useRef, useState, useImperativeHandle, useCallback} from 'react'
import { Text, View, TouchableOpacity , } from 'react-native'
import { Modalize } from 'react-native-modalize';
import {useSelector, useDispatch} from 'react-redux'
import { percentChangeCoinList } from '../../../../actions/coinListAction';
import { lookingForCoinList } from '../../../../actions/coinListAction';

export const OptionModal = React.memo(React.forwardRef((props, ref) => {
  const modalizeRef = useRef(null);
  const [id, setId] = useState(undefined)
  const dispatch = useDispatch() 
  // const title = useSelector(state => {
  //   return state.coinListOption.DATA
  // })
  
  useImperativeHandle(ref, () => ({
    open: (id) => {
      setId(id)
      console.log("fdgfgf",id)
      modalizeRef.current.open()
    },
    close: () => {
      modalizeRef.current.close()
    }
  }))
  const handlePercentChange = ({percentValue}) => {
    dispatch(percentChangeCoinList({percentValue}))
  }
  const handleLookingFor = ({lookingForValue}) => {
    dispatch(lookingForCoinList({lookingForValue}))
  }

  // useEffect(() => {
  //   console.log(title)
  // }, [])
  const renderModal = useCallback(() => {
    console.log(id)
    switch(id){
      case 'tt3':
        return(
          <Text>abc</Text>
        )
      case 'tt4':
        return(
        <View >
          <Text style = {{backgroundColor: "lightgray",padding:7}}> % Change Timeline</Text>
          <View style={{padding:10}}>
            <TouchableOpacity onPress={()=>{
              handlePercentChange({percentValue:"1h"})
              modalizeRef.current.close() 
            }}>
              <Text>1 hour</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={()=>{
                handlePercentChange({percentValue:"24h"}) 
                modalizeRef.current.close() 
              }}
              style={{marginVertical:10}}
            >
              <Text>24h hours</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              handlePercentChange({percentValue:"7d"}) 
              modalizeRef.current.close() 
            }}>
              <Text>7 days</Text>
            </TouchableOpacity>
          </View> 
        </View>
        )
      case 'tt5':

        return(
          <View >
            <Text style = {{backgroundColor: "lightgray",padding:7}}> Looking for</Text>
            <View style={{padding:10}}>
              <TouchableOpacity onPress={()=>{
                handleLookingFor({lookingForValue:"All Cryptocurrencies"})
                modalizeRef.current.close() 
              }}>
                <Text>All Cryptocurrencies</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{
                handleLookingFor({lookingForValue:"Coins"})
                modalizeRef.current.close() 
                }}
                style={{marginVertical:10}}
              >
                <Text>Coins</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{
                handleLookingFor({lookingForValue:"Tokens"})
                modalizeRef.current.close() 
              }}>
                <Text>Tokens</Text>
              </TouchableOpacity>
            </View> 
          </View>
        )
    }
  },[id])
  
  return (
  
      <Modalize ref={modalizeRef} snapPoint={190}>
        {renderModal(id)}

      </Modalize>
   
  )
}))