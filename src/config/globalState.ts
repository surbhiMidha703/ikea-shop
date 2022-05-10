import { createContext, useContext } from 'react'
import { IProduct } from '../Products/ProductType'

interface IProductContext {
  store: { prod: IProduct[] }
  dispatch: React.Dispatch<any>
}
// ! the context object
export const StateContext = createContext<IProductContext>({
  store: {
    prod: [
      {
        category: 'defaultCategory',
        price: 'defaultPrice',
        stocked: false,
        name: 'defaultName'
      }
    ]
  },
  dispatch: () => null
})

// !custom hook that wraps useContext
export const useGlobalState = () => useContext(StateContext)
