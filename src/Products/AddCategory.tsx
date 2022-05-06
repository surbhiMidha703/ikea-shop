import { Typography, Grid, TextField, Button } from '@mui/material'

export const AddCategory = (): JSX.Element => {
  // save the category to an array which should be added to the list of all the sports or phone category
  // add a function to save the category then redirect to the index page using Router.push, no need to use withRouter as this
  // addcategory is wrapped in <Router> in index.tsx
  return (
    <Grid>
      <Typography variant="body1" color="text.secondary">
        Enter a new category
      </Typography>
      <TextField />
      <Button>Save</Button>
    </Grid>
  )
}
