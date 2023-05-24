import React from 'react';
import { Grid } from '@mui/material';
import ResponsiveAppBar from './Header';

type MyComponentProps = React.PropsWithChildren<{}>;

const Layout = ({children}: MyComponentProps) => {
    return (
        <Grid container>
            <ResponsiveAppBar />
            <Grid container m={5}>
                {children}
            </Grid>
        </Grid>);
};

export default Layout;