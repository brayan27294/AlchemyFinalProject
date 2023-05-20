import React from 'react';
import { Grid } from '@mui/material';
import ResponsiveAppBar from './Header';

type MyComponentProps = React.PropsWithChildren<{}>;

const Layout = ({children}: MyComponentProps) => {
    return (
        <Grid container>
            <ResponsiveAppBar />
            {children}
        </Grid>);
};

export default Layout;