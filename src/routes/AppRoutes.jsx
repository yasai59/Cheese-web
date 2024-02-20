import React from "react";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import UserContext from "../context/UserContext";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const AppRoutes = () => {
  const { token } = useContext(UserContext);

  return (
    <Routes>
      {token ? (
        <Route path="/*" element={<PrivateRoutes />} />
      ) : (
        <Route path="/*" element={<PublicRoutes />} />
      )}
    </Routes>
  );
};
