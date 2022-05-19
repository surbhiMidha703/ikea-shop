import {
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@mui/material'

import { CustomTextField } from './CustomTextField'
import { History } from 'history'
import { FC, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useGlobalState } from '../../config/globalState'

type Values = {
  productName: string
  productPrice: string
  productType: string
  productStock: boolean
}

export const AddCategory = (): JSX.Element => {
  // save the category to an array which should be added to the list of all the sports or phone category
  // add a function to save the category then redirect to the index page using Router.push, no need to use withRouter as this
  // addcategory is wrapped in <Router> in index.tsx

  const [values, setValues] = useState<Values>({
    productName: '',
    productPrice: '',
    productType: '',
    productStock: true
  })
  const navigate = useNavigate()
  const { store, dispatch } = useGlobalState()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = fetch('/addProduct', {
      method: 'POST',
      body: JSON.stringify({
        name: values.productName,
        price: values.productPrice,
        stocked: values.productStock,
        category: values.productType
      }) // body data type must match "Content-Type" header
    })

    dispatch({
      type: 'addProduct',
      data: [
        ...store.prod,
        {
          category: values.productType,
          price: values.productPrice,
          stocked: values.productStock,
          name: values.productName
        }
      ]
    })
    // }
    navigate('/')
    // }
    // call api to set the prod value in DB(here just a json file)
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Grid container alignItems="center" direction="column">
        <Grid item>
          <Grid item>
            <Typography variant="h6" color="text.secondary">
              Enter a new category
            </Typography>
          </Grid>

          <Grid item>
            <CustomTextField label={'Name'} name="productName" changeHandler={handleChange} />
          </Grid>

          <Grid item>
            <CustomTextField label={'Price'} name="productPrice" changeHandler={handleChange} />
          </Grid>
          <Grid item mt={2}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="sporting"
                name="productType"
                value={values.productType}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="Sporting Goods"
                  control={<Radio size="small" />}
                  label="Sporting"
                />
                <FormControlLabel
                  value="Electronics"
                  control={<Radio size="small" />}
                  label="Electronics"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item mt={2}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={true}
                name="productStock"
                value={values.productStock}
                onChange={handleChange}
                row
              >
                <FormControlLabel value={true} control={<Radio size="small" />} label="yes" />
                <FormControlLabel value={false} control={<Radio size="small" />} label="no" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item container mt={2} justifyContent="center">
            <Button type={'submit'} variant="contained" color="success">
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}
