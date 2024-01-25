import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Apps from './Apps';
import { AuthProvider } from './AuthContext';
import { useAuth } from "./AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Apps/>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

