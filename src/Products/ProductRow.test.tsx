import { render, fireEvent, screen } from '@testing-library/react'
import { ProductRow } from './ProductRow'

const itemRow = {
  category: 'Sporting Goods',
  name: 'Football',
  price: '$49.99',
  stocked: true
}

describe('Product row tests', () => {
  test('Product row and price exists', () => {
    render(<ProductRow item={itemRow} />)
    expect(screen.queryAllByTestId('product-row')).toBeInTheDocument
    expect(screen.queryByAltText('product-row-price')).toBeInTheDocument
  })

  test('Product row and price do not render', () => {
    render(<ProductRow item={{}} />)
    expect(screen.queryAllByTestId('product-row')).toBeEmptyDOMElement
    expect(screen.queryAllByTestId('product-row-price')).toBeEmptyDOMElement
  })

  test('Check that drawer opens when product row is clicked', () => {
    render(<ProductRow item={itemRow} />)
    expect(screen.queryAllByTestId('drawer')).toBeInTheDocument
    const rowItemName = screen.getByText('Football')
    fireEvent.click(rowItemName)
    expect(screen.getByRole('img', { name: 'Football' })).toBeInTheDocument
    expect(screen.getByTestId('FavoriteIcon')).toBeInTheDocument
    expect(screen.getByTestId('ShareIcon')).toBeInTheDocument
    expect(screen.getByTestId('ExpandMoreIcon')).toBeInTheDocument
  })

  test('Should display text when expandmore icon is clicked', () => {
    render(<ProductRow item={itemRow} />)
    fireEvent.click(screen.getByText('Football'))
    const expandMore = screen.getByTestId('ExpandMoreIcon')
    fireEvent.click(expandMore)
    expect(screen.getByText('Method:')).toBeInTheDocument
  })
})
