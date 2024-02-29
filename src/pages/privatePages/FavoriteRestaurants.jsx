import React from "react";
import  { NavBar } from "../../components/NavBar";

export const FavoriteRestaurants = () => {
    return (
        <div className="h-screen flex">
            <NavBar />
            <h1 className="text-light">Favorite Restaurants</h1>
        </div>
    )
}