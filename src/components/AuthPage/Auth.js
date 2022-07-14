import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";

function Auth() {
  return (
    <Routes>
      <Route exact path="/login" element={<LoginPage />} />
      {/* <Route exact path="/register" element={<RegisterPage />} /> */}
      {/* <Route exact path="/password" element={<PasswordPage />} /> */}
    </Routes>
  );
}

export default Auth;
