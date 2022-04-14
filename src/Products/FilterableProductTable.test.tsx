import { FilterableProductTable } from "./FilterableProductTable"
import { render, fireEvent, screen } from '@testing-library/react'


describe('FilterableProductTests', () => {
    test('check that out of stock products dissappear when checkbox is checked', () => {
        render(<FilterableProductTable/>)
        const checkbox = screen.getByRole('checkbox', {  name: /only show products in stock/i})
        fireEvent.click(checkbox)
        expect(screen.queryByText(/basketball/i)).not.toBeInTheDocument
        expect(screen.queryByText(/iphone 5/i)).not.toBeInTheDocument

        // in stock should remain as it is:(false +ve)
        expect(screen.getByText('Football')).toBeInTheDocument

        screen.debug(screen.getByTestId('products'))
    })
})