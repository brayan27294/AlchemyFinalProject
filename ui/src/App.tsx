import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './style/theme';
import { Routes, Route } from 'react-router-dom';
import './style/App.css';
import Login from './pages/Login';
import Layout from './components/Layout';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

const App = () => {
  const isAuthenticated = useSelector((state: RootState) => state.config.isAuthenticated);
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          {isAuthenticated ?
          <>
            <Route path='/' element={<div>Home page</div>} />
            <Route path='/about' element={<div>About page</div>} />
          </>
          :<>
            <Route path='/' element={<Login />} />
          </>}
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
