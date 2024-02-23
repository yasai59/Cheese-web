import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { RememberPassword } from "../pages/publicPages/RememberPassword"; 
import { CreateAccount } from "../pages/publicPages/CreateAccount";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/remember-password" element={<RememberPassword />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
