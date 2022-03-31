import { Grid, Typography } from '@mui/material'
import { FC } from 'react'
import { IProduct } from './ProductType'

interface IProductRow {
    item: IProduct
}
export const ProductRow: FC<IProductRow> = ({ item }): JSX.Element => {
    console.log('items=>', item)
    return (
        <>
            <Grid container item mb={1} justifyContent='space-between'>
                <Grid item><Typography variant="subtitle2">{item.name}</Typography></Grid>
                <Grid item><Typography variant="subtitle2">{item.price}</Typography></Grid>

            </Grid>
        </>
    )
}