export const fetchCoinList = () => ({
  type: 'FETCH_COIN_LIST_REQUESTED'
})
export const fetchChartCoinList = (value) => ({
  value,
  type: 'FETCH_CHART_COIN_LIST_REQUESTED'
})
export const fetchFavoriteList = () => ({
  type: 'FETCH_FAVORITE_LIST_REQUESTED'
})
export const addFavoriteList = (id) => ({
  id,
  type: 'ADD_FAVORITE_LIST_REQUESTED'
})
export const deleteFavoriteList = (id) => ({
  id,
  type: 'DELETE_FAVORITE_LIST_REQUESTED'
})

export const percentChangeCoinList = ({percentValue}) => ({
  percentValue,
  type: 'PERCENT_CHANGE_COIN_LIST'
})
export const lookingForCoinList = ({ lookingForValue}) => ({
  lookingForValue,
  type: 'LOOKING_FOR_COIN_LIST'
})
export const sortByCoinList = ({ sortByValue}) => ({
  sortByValue,
  type: 'SORT_BY_COIN_LIST'
})

export const toggleCurrency = () => ({
  type: 'TOGGLE_CURRENCY'
})
export const toggleIconSort = () => ({
  type: 'TOGGLE_ICON_SORT'
})

export const changeSearchValue = (str) => ({
  str,
  type: 'CHANGE_SEARCH_VALUE'
})
export const openFavoriteList = () => ({
  type: 'OPEN_FAVORITE_LIST'
})
export const uploadImage = (path) => ({
  path,
  type: 'UPLOAD_IMAGE'
})
export const updateDisplayName = (str) => ({
  str,
  type: 'UPDATE_DISPLAY_NAME'
})
export const setId = (str) => ({
  str,
  type: 'SET_ID'
})
export const setValue = (str) => ({
  str,
  type: 'SET_VALUE'
})
export const setDisplayPrice = (value) => ({
  value,
  type: 'SET_DISPLAY_PRICE'
})
export const setDisplayTime = (time) => ({
  time,
  type: 'SET_DISPLAY_TIME'
})