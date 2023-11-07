import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from './context/theme.context';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/auth.context';
import PostsProvider from './context/posts.context';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <PostsProvider>
            <App />
          </PostsProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
