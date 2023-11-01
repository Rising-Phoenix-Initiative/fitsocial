import React, { useContext } from "react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import { ThemeProvider as MuiComponentsThemeProvider } from '@mui/material/styles';

import { lightTheme, darkTheme } from './styles/styled-components/theme';
import { createMuiTheme } from "./styles/mui/theme";
import GlobalStyle from './styles/styled-components/global.styles';
import MuiGlobalStyles from "./styles/mui/global.styles";
import { ThemeProviderContext } from "./styles/styled-components/ThemeProvider.context";

import AppRoutes from "./AppRoutes";
import { Helmet } from "react-helmet";
import Header from "./components/common/header/header.component";

const App = () => {
  const { theme } = useContext(ThemeProviderContext);
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  const muiTheme = createMuiTheme(currentTheme);

  return (
    <StyledComponentsThemeProvider theme={currentTheme}>
      <MuiComponentsThemeProvider theme={muiTheme}>
        <Helmet>
          <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet" />
        </Helmet>
        <GlobalStyle />
        <MuiGlobalStyles />
        {/* <Header authenticated={true} /> */}
        <AppRoutes authenticated={true} />
      </MuiComponentsThemeProvider>
    </StyledComponentsThemeProvider>
  );
};

export default App;