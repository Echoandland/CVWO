// App.tsx
import React from "react";
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import MainPage from "./MainPage";
import TestPage from "./TestPage";
import AccountPage from "./AccountPage";
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


const Apps: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/main" element={<MainPage/>} />
        <Route path="/test" element={<TestPage/>} />
        <Route path="/account" element={<AccountPage/>} />
      </Routes>
    </Router>
  );
};

export default Apps;
