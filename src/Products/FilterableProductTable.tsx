import { ProductTable } from './ProductTable'
import { SearchBar } from './SearchBar'
import Grid from '@mui/material/Grid'
import Products from './Products.json'
import { useState } from 'react'
import { IProduct } from './ProductType'
import './ProductStyles.css'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  grid: {
    minHeight: '60%'
  }
})

export const FilterableProductTable = () => {
  const classes = useStyles() //legacy code

  const [prod, setProducts] = useState<IProduct[]>(Products)
  const [searchWord, setSearchWord] = useState('')
  const [checked, setChecked] = useState(false)

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
        setProducts(setInStockProducts(Products))
      }
      setSearchWord(searchWord)
      setProducts(matchSearchWordWithProducts(searchWord, prod))
    } else if (searchWord === '' && !checked) {
      setSearchWord('')
      setProducts(Products)
    } else if (searchWord === '' && checked) {
      setSearchWord('')
      setProducts(setInStockProducts(Products))
    }
  }

  const onCheckBoxChange = (checked: boolean) => {
    setChecked(checked)
    if (checked) {
      setProducts(setInStockProducts(prod))
    } else if (searchWord === '' && !checked) {
      setProducts(Products)
    } else if (searchWord !== '' && !checked) {
      setProducts(matchSearchWordWithProducts(searchWord, Products))
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
    </Grid>
  )
}
