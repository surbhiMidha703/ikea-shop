// export {}
import { ProductTable } from './ProductTable'
import {render, fireEvent, screen} from '@testing-library/react'
import { IProduct } from './ProductType'
const products: IProduct[] = [{
    category: "Sporting Goods",
    name: "Football",
    price: "$49.99",
    stocked: true
},
{
    category: "Sporting Goods",
    name: "Basketball",
    price: "$39.99",
    stocked: true
},
{
    category: "Sporting Goods",
    name: "Tennis",
    price: "$9.99",
    stocked: true
}]

describe('Product table tests', () => {
    test('Should contain headings', () => {
        render(<ProductTable products={[]}/>)
        screen.getByRole('heading', {  name: 'NAME'})
        screen.getByRole('heading', {  name: 'PRICE'})
    })
    
    test('Should not render products, if products arr is empty', () => {
        render(<ProductTable products={[]}/>)
        expect(screen.queryByTestId('products')).toBeInTheDocument
        expect(screen.queryByTestId('products')).toBeEmptyDOMElement
     })
    
     test('Should render products', () => {
         render(<ProductTable products={products}/>)
         expect(screen.queryByTestId('products')).toBeInTheDocument
         expect(screen.queryByTestId('products')).not.toBeEmptyDOMElement
         expect(screen.queryByTestId('product-category')).toBeInTheDocument
         expect(screen.queryAllByTestId('product-row')[0]).toBeInTheDocument
     })
})