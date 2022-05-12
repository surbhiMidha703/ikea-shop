import React, { useReducer } from 'react'
import './index.css'
import { FilterableProductTable } from './Products/FilterableProductTable'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { worker } from './mocks/browser'
import TagManager from 'react-gtm-module'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { AddCategory } from './Products/NewCategory/AddCategory'
import { NotFound } from './Products/NotFound'
import { stateReducer } from './config/stateReducer'
import { StateContext } from './config/globalState'

export const App = () => {
  const initialState = {
    prod: []
  }
  // note - use destructuring assignment to add the returned data from link to
  // the list of products

  // !useReducer takes reducer function and initial state and returns current state (store) and dispatch function

  const [store, dispatch] = useReducer(stateReducer, initialState)

  const tagManagerArgs = {
    gtmId: 'GTM-N7LTGN7'
  }

  TagManager.initialize(tagManagerArgs)

  const theme = createTheme()

  if (process.env.NODE_ENV === 'development') {
    worker.start()
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.StrictMode>
        <StateContext.Provider value={{ store, dispatch }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<FilterableProductTable />} />
              <Route path="/category" element={<AddCategory />} />
              <Route element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </StateContext.Provider>
      </React.StrictMode>
      ,
    </ThemeProvider>
  )

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
}
