import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import LandingPage from './components/pages/LandingPage';
import Dashboard from './components/pages/Dashboard';
import TranslationLoader from './components/TranslationLoader';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TranslationLoader>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </TranslationLoader>
    </ThemeProvider>
  );
}

export default App;