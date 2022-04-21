import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { FilterableProductTable } from './Products/FilterableProductTable'
import reportWebVitals from './reportWebVitals'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { worker } from './mocks/browser'
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
  gtmId: 'GTM-N7LTGN7'
}

TagManager.initialize(tagManagerArgs)

const theme = createTheme()

if (process.env.NODE_ENV === 'development') {
  worker.start()
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <React.StrictMode>
      <FilterableProductTable />
    </React.StrictMode>
    ,
  </ThemeProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
