import { SearchBar } from './SearchBar'
import {render, fireEvent, screen} from '@testing-library/react'

const onSearchChange = jest.fn()
const onCheckBoxChange = jest.fn()
test('SearchBar and checkbox tests',() => {
    render(<SearchBar onSearchChange={onSearchChange} searchTerm={'foo'} onCheckBoxChange={onCheckBoxChange}/>)
    const searchBar = screen.getByLabelText('Search...')
    fireEvent.click(searchBar)
    screen.findByText('foo')
    
    screen.getByText(/only show products in stock/i)
    const checkbox = screen.getByRole('checkbox', {  name: /only show products in stock/i})
    fireEvent.click(checkbox)
    expect(checkbox.checked).toEqual(true)
})