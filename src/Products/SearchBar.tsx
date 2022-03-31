import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FC } from 'react';

interface ISearchBar {
    onSearchChange: (val: string) => void,
    searchTerm: string,
}

export const SearchBar: FC<ISearchBar> = ({ onSearchChange, searchTerm }): JSX.Element => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value)
    }

    return (

        <Grid item container justifyContent="center" direction="column" alignItems="center" data-automation="hello" >
            <TextField
                autoComplete="given-name"
                name="firstName"
                id="firstName"
                label="Search..."
                autoFocus
                size="small"
                onChange={handleChange}
                value={searchTerm}
                fullWidth
            />
            <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Only show products in stock"
            />
        </Grid>

    )
}