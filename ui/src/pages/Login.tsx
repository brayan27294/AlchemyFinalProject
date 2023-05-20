import * as React from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { loginAction } from '../redux/reducers/configReducer';

const Login = () => {
  const dispatch = useDispatch();
  const loginHandler = (action: string) => {
    const userData = {
      isAuthenticated: true,
      role: action.split('_')[0].toLowerCase(),
      userName: 'Test',
      address: '47547587358ASDA34763275ASD',
    };
    dispatch(loginAction(action, userData));
  }
  return (
    <Grid container direction='column' justifyContent='center' alignItems='center' sx={{marginTop: '20%'}}>
      <Card sx={{ maxWidth: 390 }}>
        <CardHeader
          title='Login into the application'
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This is an application to create NFT Tokens to represent Certifications. The certifier can define what are the requirement to win
            the certification (NFT). The client can ask for a certification and send the evidence after complete the training or pass the final test.
          </Typography>
      </CardContent>
        <CardActions>
          <Button variant='outlined' onClick={()=> loginHandler('CERTIFIER_LOGIN')}>Login as a Certifier</Button>
          <Button variant='outlined' color='secondary' onClick={()=> loginHandler('CLIENT_LOGIN')}>Login as a Client</Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Login;