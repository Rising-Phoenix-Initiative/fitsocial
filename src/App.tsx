import React, { useContext } from "react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import { ThemeProvider as MuiComponentsThemeProvider } from '@mui/material/styles';

import { lightTheme, darkTheme } from './styles/styled-components/theme';
import { createMuiTheme } from "./styles/mui/theme";
import GlobalStyle from './styles/styled-components/global.styles';
import MuiGlobalStyles from "./styles/mui/global.styles";
import { ThemeProviderContext } from "./context/theme.context";

import { Helmet } from "react-helmet";
import Dashboard from "./views/dashboard/dashboard.screen";
import Landing from "./views/landing/landing.screen";
import { useAuth } from "./context/auth.context";
import Loader from "./components/loader/loader.component";

const App = () => {
  const { isAuthenticated, authenticating } = useAuth();
  const { theme } = useContext(ThemeProviderContext);
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  const muiTheme = createMuiTheme(currentTheme);

<<<<<<< HEAD:src/App.tsx
  console.log("authIsLoading", authenticating);

=======
>>>>>>> origin/main:src/App.js
  return (
    <StyledComponentsThemeProvider theme={currentTheme}>
      <MuiComponentsThemeProvider theme={muiTheme}>
        <Helmet>
          <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet" />
        </Helmet>
        <GlobalStyle />
        <MuiGlobalStyles />
        {authenticating ? <Loader /> : (isAuthenticated ? <Dashboard /> : <Landing />)}
      </MuiComponentsThemeProvider>
    </StyledComponentsThemeProvider>
  );
};

export default App;