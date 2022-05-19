export const stateReducer = (state: any, action: { type: any; data: any }) => {
  switch (action.type) {
    case 'setProductsFromApiRes': {
      return {
        ...state,
        prod: action.data
      }
    }
    case 'addProduct': {
      return {
        prod: action.data
      }
    }
    default:
      return state
  }
}
