import { ProductTable } from "./ProductTable"
import { SearchBar } from "./SearchBar"
import Grid from '@mui/material/Grid';
import Products from './Products.json'
import { useState } from "react";
import { IProduct } from './ProductType'
import './ProductStyles.css';
// import { makeStyles } from '@mui/styles';
// import { makeStyles } from '@mui/styles/makeStyles';

//legacy code not working will use emotion for the time being
// const useStyles = makeStyles({
//     root: {
//         borderRadius: 12,
//         backgroundColor: "blue"
//     },
//     grid: {
//         minHeight: 341,
//         background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
//     },
// });

export const FilterableProductTable = () => {
    // const classes = useStyles(); //legacy code

    const [prod, setProducts] = useState<IProduct[]>(Products)
    const [searchWord, setSearchWord] = useState('')
    const [checked, setChecked] = useState(false)

    const matchSearchWordWithProducts = (searchWord: string, productParam: IProduct[]) => {
        return productParam.filter((product) => {
            if (product?.name?.toLowerCase().includes(searchWord.toLowerCase()))
                return product
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
        } else if ((searchWord === '') && (!checked)) {
            setSearchWord('')
            setProducts(Products)
        } else if ((searchWord === '') && (checked)) {
            setSearchWord('')
            setProducts(setInStockProducts(Products))
        }
    }

    const onCheckBoxChange = (checked: boolean) => {
        setChecked(checked)
        if (checked) {
            setProducts(setInStockProducts(prod))
        } else if ((searchWord === '') && (!checked)) {
            setProducts(Products)
        } else if ((searchWord !== '') && (!checked)) {
            setProducts(matchSearchWordWithProducts(searchWord, Products))
        }
    }

    return (
        <Grid
            item
            container
            direction="column"
            alignItems="center"
            className='filterableGrid'
        // className={classes.grid}  //legacy code
        >
            <Grid item>
                <SearchBar onSearchChange={onSearchChange} searchTerm={searchWord} onCheckBoxChange={onCheckBoxChange} />
                <ProductTable products={prod} />
            </Grid>
        </Grid>

    )
}