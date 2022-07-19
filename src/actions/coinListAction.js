export const fetchCoinList = (sortSaga) => ({
  sortSaga,
  type: 'FETCH_COIN_LIST_REQUESTED'
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