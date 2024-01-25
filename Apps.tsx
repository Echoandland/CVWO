import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import MainPage from "./MainPage";
import TestPage from "./TestPage";
import AccountPage from "./AccountPage";
import { AuthProvider, useAuth } from "./AuthContext";

const Apps: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Apps;
