// src/mocks/handlers.js
import { rest } from 'msw'
import products from '../Products/Products.json'

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(products))
  })
]
