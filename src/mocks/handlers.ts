// src/mocks/handlers.js
import { rest } from 'msw'
import products from '../Products/Products.json'

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    // below line will give issue as when the page is loaded the products will
    // come from json file
    // rather than localstorage
    if (localStorage.getItem('products') === null) {
      localStorage.setItem('products', JSON.stringify(products))
    }
    const productsFromStorage = localStorage.getItem('products')
    // console.log('productsFromStorage=> ', productsFromStorage)
    // console.log('productsFromStorage parsed=> ', JSON.parse(productsFromStorage || '{}'))
    return res(ctx.status(200), ctx.json(JSON.parse(productsFromStorage || '{}')))
  }),

  rest.post('/addProduct', (req, res, ctx) => {
    //@ts-ignore
    const newProduct = JSON.parse(req.body)
    //@ts-ignore
    const products = JSON.parse(localStorage.getItem('products'))
    // const updatedProducts = JSON.stringify([...products, req.body])
    const updatedProducts = [...products, newProduct]
    localStorage.setItem('products', JSON.stringify(updatedProducts))
    // localStorage.setItem('products',)
    return res(ctx.status(200))
  })
]
