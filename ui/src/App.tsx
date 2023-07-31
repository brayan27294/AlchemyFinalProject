import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./style/theme";
import { Routes, Route } from "react-router-dom";
import "./style/App.css";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout/Layout";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import CertificationPage from "./pages/CertificationPage";
import NFTPage from "./pages/NFTPage";
import MyCertPage from "./pages/MyCertPage";
import AvailableCertificationPage from "./pages/AvailableCertificationPage";

const App = () => {
  const { isAuthenticated, role } = useSelector(
    (state: RootState) => state.config
  );
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route
                path="/"
                element={
                  role === "certifier" ? <CertificationPage /> : <MyCertPage />
                }
              />
              <Route path="/nft" element={<NFTPage />} />
              <Route
                path="/allCertifications"
                element={<AvailableCertificationPage />}
              />
            </>
          ) : (
            <>
              <Route path="/" element={<LoginPage />} />
            </>
          )}
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
