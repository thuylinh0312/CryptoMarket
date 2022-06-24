import React, {useEffect, useRef, useState, useImperativeHandle} from 'react'
import { Text } from 'react-native'
import { Modalize } from 'react-native-modalize';

export const OptionModal = React.memo(React.forwardRef((props, ref) => {
  const modalizeRef = useRef(null);
  const [id, setId] = useState(undefined)
  
  useImperativeHandle(ref, () => ({
    open: (id) => {
      setId(id)
      modalizeRef.current.open()
    },
    close: () => {
      modalizeRef.current.close()
    }
  }))

  useEffect(() => {
  }, [])

  return (
    <Modalize ref={modalizeRef} snapPoint={400}>
      <Text>123123</Text>
    </Modalize>
  )
}))