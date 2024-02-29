import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "../pages/privatePages/MainPage";
import { LikedHistory } from "../pages/privatePages/LikedHistory";
import { YourRestaurants } from "../pages/privatePages/YourRestaurants";
import { FavoriteRestaurants } from "../pages/privatePages/FavoriteRestaurants";
import { YourProfile } from "../pages/privatePages/YourProfile";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage/>} />
      <Route path="/liked-history" element={<LikedHistory/>} />
      <Route path="/your-restaurants" element={<YourRestaurants/>} />
      <Route path="/favorite-restaurants" element={<FavoriteRestaurants/>} />
      <Route path="/your-profile" element={<YourProfile/>} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
