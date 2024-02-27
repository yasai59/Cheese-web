import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "../pages/privatePages/MainPage";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage/>} />
      <Route path="/about" element={<h1>About</h1>} />
      <Route path="/tastes-form" element={<Navigate to="" />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
