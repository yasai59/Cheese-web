import React from "react";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

export const YourRestaurants = () => {
  const { restaurants } = useContext(UserContext);
  console.log(restaurants);
  return (
    <>
      <div className="w-full mx-auto flex flex-col py-4">
        <h1 className="text-4xl text-light font-bold ms-5">Your Restaurants</h1>
        <div className="tablet:grid tablet:grid-cols-2 laptop:grid-cols-3">
          {
            restaurants.map((restaurant) => (
              <Link to={`/your-restaurant/${restaurant.id}`} key={restaurant.id}>
                <div key={restaurant.id} className="flex border border-dark rounded-lg p-5 m-5 bg-base tablet:gap-4">
                  <div className="w-[20%] flex justify-center items-center">
                    <img className="w-28" src={`${axios.defaults.baseURL}/api/restaurant/profilephoto/${restaurant.photo}`}></img>
                  </div>
                  <div className="w-full flex flex-col justify-center items-end">
                    <h2 className="text-2xl text-white font-bold">{restaurant.name}</h2>
                    <p className="text-light">{restaurant.description}</p>
                    <p className="text-light">{restaurant.address}</p>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>

        <div className="flex justify-center">
          <Link to="/add-restaurant" className="border-primary border rounded-md py-1 px-2 text-primary">
            + Add restaurant
          </Link>
        </div>
      </div>
    </>
    

  );
};
