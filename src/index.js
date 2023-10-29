import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from './styles/ThemeProvider.context';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
