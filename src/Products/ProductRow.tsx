import { Grid } from '@mui/material'
import { FC } from 'react'
import { IProduct } from './ProductType'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'
import { displayProductInfo } from './utils'
import { ProductInfoCard } from './ProductInfoCard'

interface IProductRow {
  item: IProduct
}

const useStyles = makeStyles({
  list: {
    width: 300
  },
  button: {
    textTransform: 'lowercase'
  }
})

export const ProductRow: FC<IProductRow> = ({ item }): JSX.Element => {
  const classes = useStyles()
  const [leftDrawer, setLeftDrawer] = useState(false)

  const captureProductNameClick = (itemName?: string) => {
    console.log('hello capture')
    if (window && window.dataLayer) {
      window.dataLayer.push({
        event: 'productNameClick', // the event here corresponds to the 'event name' setup in the trigger, triggers listen to the event, then tag is fired
        page: {
          // these are variables (page.url, page.title)
          url: '/'
        },
        props: {
          name: itemName // this is also variable under props
        }
      })
    }
  }

  const toggleDrawer =
    (open: boolean, itemName?: string) => (event: React.KeyboardEvent | React.MouseEvent) => {
      console.log('I am called! with open=> ', open)
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setLeftDrawer(open)
      captureProductNameClick(itemName)
    }

  const list = (itemName?: string) => {
    return (
      <Grid className={classes.list} role="presentation">
        <ProductInfoCard productInfo={displayProductInfo(itemName)}></ProductInfoCard>
      </Grid>
    )
  }
  return (
    <>
      <Grid container item mb={1} justifyContent="space-between">
        <Button
          onClick={toggleDrawer(true, item.name)}
          disableRipple
          color="primary"
          className={classes.button}
          data-testid="product-row"
        >
          {item.name}
        </Button>
        <Button
          onClick={toggleDrawer(true, item.name)}
          disableRipple
          color="primary"
          data-testid="product-row-price"
        >
          {item.price}
        </Button>
        <Drawer
          anchor={'left'}
          open={leftDrawer}
          onClose={toggleDrawer(false)}
          data-testid="drawer"
        >
          {list(item.name)}
        </Drawer>
      </Grid>
    </>
  )
}
