import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider, useTheme } from './contexts/ThemeProvider';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CoinDetails from './components/CoinDetails';
import Portfolio from './components/Portfolio';
import ErrorBoundary from './components/ErrorBoundary';
import { AppContainer } from './styles/StyledComponents';
import './styles/global.css';

const ThemedApp = () => {
  const { darkMode } = useTheme();

  return (
    <StyledThemeProvider theme={{ darkMode }}>
      <Router>
        <ErrorBoundary>
          <AppContainer>
            <Header />
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/coin/:id" element={<CoinDetails />} />
              <Route path="/portfolio" element={<Portfolio />} />
            </Routes>
          </AppContainer>
        </ErrorBoundary>
      </Router>
    </StyledThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

export default App;