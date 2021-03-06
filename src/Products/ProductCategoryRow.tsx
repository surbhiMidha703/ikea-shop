import { Grid, Typography } from '@mui/material'
import { FC } from 'react'

interface IProductCategoryRow {
  productCategory?: string
}
export const ProductCategoryRow: FC<IProductCategoryRow> = ({ productCategory }): JSX.Element => {
  return (
    <Grid item data-testid="product-category">
      <Typography variant="body1" color="text.secondary">
        {productCategory}
      </Typography>
    </Grid>
  )
}
