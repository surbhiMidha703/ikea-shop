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

    const matchSearchWordWithProducts = (searchWord: string) => {
        let searchResult: IProduct[] = []

        prod.map((product) => {
            if (product?.name?.toLowerCase().includes(searchWord.toLowerCase()))
                searchResult.push(product)
        })

        return searchResult
    }

    const onSearchChange = (searchWord: string) => {
        // prod state will be set as per the search term (api call or string match from json)
        // call a function here

        setSearchWord(searchWord)
        setProducts(matchSearchWordWithProducts(searchWord))

        if (searchWord === '') {
            setProducts(Products)
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
                <SearchBar onSearchChange={onSearchChange} searchTerm={searchWord} />
                <ProductTable products={prod} />
            </Grid>
        </Grid>

    )
}