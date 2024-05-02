import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainPage } from "../pages/privatePages/MainPage";
import { LikedHistory } from "../pages/privatePages/LikedHistory";
import { YourRestaurants } from "../pages/privatePages/YourRestaurants";
import { FavoriteRestaurants } from "../pages/privatePages/FavoriteRestaurants";
import { YourProfile } from "../pages/privatePages/YourProfile";
import { NavBar } from "../components/NavBar";
import { NavBarMobile } from "../components/NavBarMobile";
import { HeaderMobile } from "../components/HeaderMobile";
import { AddRestaurant } from "../pages/privatePages/AddRestaurant";
import { ViewRestaurant } from "../pages/privatePages/ViewRestaurant";
import { Restaurant } from "../pages/privatePages/Restaurant";

export const PrivateRoutes = () => {
  return (
    <div className="min-h-screen flex flex-col tablet:flex-row">
      <div className="hidden tablet:block">
        <NavBar />
      </div>
      <div className="block tablet:hidden">
        <HeaderMobile />
      </div>
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/liked-history" element={<LikedHistory />} />
          <Route path="/your-restaurants" element={<YourRestaurants />} />
          <Route
            path="/favorite-restaurants"
            element={<FavoriteRestaurants />}
          />
          <Route path="/your-profile" element={<YourProfile />} />
          <Route path="/add-restaurant" element={<AddRestaurant />} />
          <Route
            path="/your-restaurant/:restaurantId"
            element={<Restaurant />}
          />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <div className="h-min-content tablet:hidden">
        <NavBarMobile />
      </div>
    </div>
  );
};
