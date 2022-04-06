import { Grid } from '@mui/material'
import { FC } from 'react'
import { IProduct } from './ProductType'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react'
import { displayProductInfo } from './utils'

interface IProductRow {
    item: IProduct
}

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    button: {
        textTransform: 'lowercase'
    }
});

export const ProductRow: FC<IProductRow> = ({ item }): JSX.Element => {
    let drawerInfo: string[] = []
    const classes = useStyles();
    const [leftDrawer, setLeftDrawer] = useState(false)

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setLeftDrawer(open)
    };

    const list = (itemName: string) => {
        return (
            <Grid
                className={classes.list}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                {displayProductInfo(itemName)}

            </Grid>
        )
    }
    return (
        <>
            <Grid container item mb={1} justifyContent='space-between'>
                <Button onClick={toggleDrawer(true)} disableRipple color='primary' className={classes.button}>{item.name}</Button>
                <Button onClick={toggleDrawer(true)} disableRipple color='primary'>{item.price}</Button>
                <Drawer anchor={'left'} open={leftDrawer} onClose={toggleDrawer(false)}>
                    {list(item.name)}
                </Drawer>
            </Grid>
        </>
    )
}