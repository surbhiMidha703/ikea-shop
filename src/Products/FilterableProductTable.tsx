import { ProductTable } from './ProductTable'
import { SearchBar } from './SearchBar'
import Grid from '@mui/material/Grid'
import Products from './Products.json'
import { useState, useEffect } from 'react'
import { IProduct } from './ProductType'
import './ProductStyles.css'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { useGlobalState } from '../config/globalState'

const useStyles = makeStyles({
  grid: {
    minHeight: '60%'
  }
})

// can use api here to fetch products

export const FilterableProductTable = () => {
  const classes = useStyles() //legacy code

  const { store, dispatch } = useGlobalState()
  const { prod } = store
  const [searchWord, setSearchWord] = useState('')
  const [checked, setChecked] = useState(false)

  const pushPageViewToDataLayer = () => {
    if (window && window.dataLayer) {
      window.dataLayer.push({
        event: 'pageview', // the event here corresponds to the 'event name' setup in the trigger, triggers listen to the event, then tag is fired
        page: {
          // these are variables (page.url, page.title)
          url: '/',
          title: 'Home page'
        }
      })
    }
  }

  useEffect(() => {
    pushPageViewToDataLayer()
    ;(async () => {
      if (prod.length === 0) {  // only call api once when the prod global state is empty
        const response = await fetch('/products')
        const products = await response.json()
        dispatch({
          type: 'setProductsFromApiRes',
          data: products
        })
      }
    })()
  }, [])

  const matchSearchWordWithProducts = (searchWord: string, productParam: IProduct[]) => {
    return productParam.filter((product) => {
      if (product?.name?.toLowerCase().includes(searchWord.toLowerCase())) return product
    })
  }

  const setInStockProducts = (productsParam: IProduct[]) => {
    return productsParam.filter((product) => {
      if (product?.stocked) {
        return product
      }
    })
  }

  const onSearchChange = (searchWord: string) => {
    // prod state will be set as per the search term (api call or string match from json)
    // call a function here
    if (searchWord !== '') {
      if (checked) {
        // this will might cause problem as the json data is as it is
        dispatch({
          type: 'setProductsFromApiRes',
          data: setInStockProducts(Products)
        })
      }
      setSearchWord(searchWord)
      dispatch({
        type: 'setProductsFromApiRes',
        data: matchSearchWordWithProducts(searchWord, prod)
      })
    } else if (searchWord === '' && !checked) {
      setSearchWord('')
      dispatch({
        type: 'setProductsFromApiRes',
        data: Products
      })
    } else if (searchWord === '' && checked) {
      setSearchWord('')
      dispatch({
        type: 'setProductsFromApiRes',
        data: setInStockProducts(Products)
      })
    }
  }

  const onCheckBoxChange = (checked: boolean) => {
    setChecked(checked)
    if (checked) {
      dispatch({
        type: 'setProductsFromApiRes',
        data: setInStockProducts(prod)
      })
    } else if (searchWord === '' && !checked) {
      dispatch({
        type: 'setProductsFromApiRes',
        data: Products
      })
    } else if (searchWord !== '' && !checked) {
      dispatch({
        type: 'setProductsFromApiRes',
        data: matchSearchWordWithProducts(searchWord, Products)
      })
    }
  }

  return (
    <Grid item container direction="column" alignItems="center" className={classes.grid}>
      <Grid item>
        <SearchBar
          onSearchChange={onSearchChange}
          searchTerm={searchWord}
          onCheckBoxChange={onCheckBoxChange}
        />
        <ProductTable products={prod} />
      </Grid>
      <Link to="/category">Add Category</Link>
    </Grid>
  )
}
