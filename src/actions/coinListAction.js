export const fetchCoinList = ({start}) => ({
  start,
  type: 'FETCH_COIN_LIST_REQUESTED'
})
export const resetCoinList = () => ({
  type: 'RESET_COIN_LIST'
})

export const percentChangeCoinList = ({percentValue}) => ({
  percentValue,
  type: 'PERCENT_CHANGE_COIN_LIST'
})
export const lookingForCoinList = ({ lookingForValue}) => ({
  lookingForValue,
  type: 'LOOKING_FOR_COIN_LIST'
})
export const toggleCurrency = () => ({
  type: 'TOGGLE_CURRENCY'
})