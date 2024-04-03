import React from "react";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

export const YourRestaurants = () => {
  const { restaurants } = useContext(UserContext);
  
  return (
    <div className="w-full mx-auto flex flex-col py-4">
      <h1 className="text-4xl text-light font-bold ms-5">Your Restaurants</h1>
      <div>
        {
          restaurants.map((restaurant) => (
            <div key={restaurant.id} className="flex flex-col border border-dark rounded-lg p-5 m-5">
              <h2 className="text-2xl text-light font-bold">{restaurant.name}</h2>
              <p className="text-light">{restaurant.description}</p>
              <p className="text-light">Address: {restaurant.address}</p>
              <img src={`${axios.defaults.baseURL}/api/restaurant/profilephoto/${restaurant.photo}`}></img>
            </div>
          ))
        }
      </div>
      <div className="flex justify-center">
        <Link to="/add-restaurant" className="border-primary border rounded-md py-1 px-2 text-primary">
          + Add restaurant
        </Link>
      </div>
    </div>
    

  );
};
