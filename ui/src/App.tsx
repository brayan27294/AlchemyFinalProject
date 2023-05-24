import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './style/theme';
import { Routes, Route } from 'react-router-dom';
import './style/App.css';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout/Layout';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import CertificationPage from './pages/CertificationPage';
import NFTPage from './pages/NFTPage';
import MyCertPage from './pages/MyCertPage';

const App = () => {
  const isAuthenticated = useSelector((state: RootState) => state.config.isAuthenticated);
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          {isAuthenticated ?
          <>
            <Route path='/' element={<CertificationPage />} />
            <Route path='/nft' element={<NFTPage />} />
            <Route path='/myCertifications' element={<MyCertPage />} />
          </>
          :<>
            <Route path='/' element={<LoginPage />} />
          </>}
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
