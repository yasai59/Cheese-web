import React from "react";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import UserContext from "../context/UserContext";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { AdminRoutes } from "./AdminRoutes";

export const AppRoutes = () => {
  const { token, user } = useContext(UserContext);

  return (
    <Routes>
      {token ? (
        user.role_id === 3 ? (
          <Route path="/*" element={<AdminRoutes />} />
        ) : (
          <Route path="/*" element={<PrivateRoutes />} />
        )
      ) : (
        <Route path="/*" element={<PublicRoutes />} />
      )}
    </Routes>
  );
};
