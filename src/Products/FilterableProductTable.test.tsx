import { FilterableProductTable } from './FilterableProductTable'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
// this file uses the msw setup done in server.ts

test('check that out of stock products dissappear when checkbox is checked', async () => {
  render(<FilterableProductTable />)
  const checkbox = screen.getByRole('checkbox', { name: /only show products in stock/i })
  fireEvent.click(checkbox)
  await waitFor(() => screen.getByText('Football'))
  expect(screen.queryByText(/basketball/i)).not.toBeInTheDocument
  expect(screen.queryByText(/iphone 5/i)).not.toBeInTheDocument

  expect(screen.getByText('Football')).toBeInTheDocument
})
