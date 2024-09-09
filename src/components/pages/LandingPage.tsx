import React from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "../atoms/Header";
import { DashboardTemplate } from "../template/DashboardTemplate";
import Footer from "../atoms/Footer";
import FloatingLanguageSwitch from "../atoms/FloatingLanguageSwitch";
import theme from "../../theme";

const LandingPage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Box sx={{ display: "flex", flex: 1 }}>
          <Box component="main" sx={{ flexGrow: 1, p: 3, width: "100%" }}>
            <DashboardTemplate />
          </Box>
        </Box>
        <Footer />
        <FloatingLanguageSwitch />
      </Box>
    </ThemeProvider>
  );
};

export default LandingPage;
