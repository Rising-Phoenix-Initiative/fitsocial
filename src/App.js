import React, { useContext } from "react";
import AppRoutes from "./AppRoutes";
import { lightTheme, darkTheme } from './styles/theme';
import GlobalStyle from './styles/global.styles';
import { ThemeProviderContext } from "./styles/ThemeProvider.context";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";

const App = () => {
  const { theme } = useContext(ThemeProviderContext);
  console.log("theme", theme);

  return (
    <StyledComponentsThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <AppRoutes />
    </StyledComponentsThemeProvider>
  );
};

export default App;