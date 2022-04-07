import { Grid, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { ProductCategoryRow } from './ProductCategoryRow'
import { ProductRow } from './ProductRow'
import { IProduct } from './ProductType'

interface IProductTable {
  products: IProduct[]
}

export const ProductTable: FC<IProductTable> = ({ products }): JSX.Element => {
  let category = ''

  const notDuplicateCategory = (cat: string) => {
    if (cat !== category) {
      category = cat
      return true
    } else {
      return false
    }
  }

  const productInfo = products.map((product) => (
    <>
      {notDuplicateCategory(product.category) && (
        <Grid item container justifyContent="center">
          <ProductCategoryRow productCategory={product.category} />
        </Grid>
      )}
      <Grid item container justifyContent="center">
        <ProductRow item={product} />
      </Grid>
    </>
  ))
  return (
    <>
      <Grid item container mt="10px" justifyContent="space-between">
        <Grid item>
          <Typography variant="subtitle2" fontWeight="bold">
            NAME
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" fontWeight="bold">
            PRICE
          </Typography>
        </Grid>
      </Grid>
      <Grid item container direction="column">
        {productInfo}
      </Grid>
    </>
  )
}
