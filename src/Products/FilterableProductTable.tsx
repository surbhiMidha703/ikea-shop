import { ProductTable } from "./ProductTable"
import { SearchBar } from "./SearchBar"
import Grid from '@mui/material/Grid';
import Products from './Products.json'
import { useState } from "react";
import { IProduct } from './ProductType'

export const FilterableProductTable = () => {
    console.log('products=> ', Products)
    const [prod, setProducts] = useState<IProduct[]>(Products)
    const [searchWord, setSearchWord] = useState('')
    console.log('prod in filter=> ', prod)

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
    }
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item>
                <SearchBar onSearchChange={onSearchChange} searchTerm={searchWord} />
                <ProductTable products={prod} />
            </Grid>
        </Grid>

    )
}