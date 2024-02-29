import React from "react";
import { NavBar } from "../../components/NavBar";

export const YourRestaurants = () => {
    return (
        <div className="h-screen flex">
            <NavBar />
            <h1 className="text-light">Your Restaurants</h1>
        </div>
    )
}