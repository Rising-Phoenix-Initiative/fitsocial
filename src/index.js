import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';
import { ThemeProvider } from './context/theme.context';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/auth.context';
import PostsProvider from './context/posts.context';

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
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
);
