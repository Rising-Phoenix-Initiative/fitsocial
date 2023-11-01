import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from './styles/styled-components/ThemeProvider.context';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/auth.context';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
