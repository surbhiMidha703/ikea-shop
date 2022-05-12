import React from 'react'
import { TextField } from '@material-ui/core'

type CustomTextFieldProps = {
  label: string
  name: string
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const CustomTextField = (props: CustomTextFieldProps) => {
  return (
    <TextField
      label={props.label}
      name={props.name}
      onChange={props.changeHandler}
      variant={'outlined'} //enables special material-ui styling
      size={'small'}
      margin={'dense'}
      id="outlined-helperText"
    />
  )
}
