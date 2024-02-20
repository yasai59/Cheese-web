import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Privado</h1>} />
      <Route path="/about" element={<h1>About</h1>} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
