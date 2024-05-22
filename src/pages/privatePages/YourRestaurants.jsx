import React from "react";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

export const YourRestaurants = () => {
  let { restaurants } = useContext(UserContext);
  const { user } = useContext(UserContext);

  restaurants = restaurants.filter((restaurant) => restaurant.owner_id === user.id);
  return (
    <>
      <div className="w-full mx-auto flex flex-col py-4">
        <h1 className="text-4xl text-light font-bold ms-5">Your Restaurants</h1>
        <div className="flex flex-col tablet:grid tablet:grid-cols-2 laptop:grid-cols-3 gap-4 mx-5 mt-5">
          {restaurants.map((restaurant) => (
            <Link to={`/your-restaurant/${restaurant.id}`} key={restaurant.id}>
              <div
                key={restaurant.id}
                className="flex border border-dark rounded-lg p-5 bg-base tablet:gap-4"
                style={{ minHeight: "100px" }}
              >
                <div className="w-[20%] flex justify-center items-center">
                  <img
                    className="w-28 aspect-[1/1] object-cover"
                    src={`${axios.defaults.baseURL}/api/restaurant/profilephoto/${restaurant.photo}`}
                    alt={`${restaurant.name} profile`}
                  />
                </div>
                <div className="w-full flex flex-col justify-center items-end text-light">
                  <h2 className="text-2xl text-white font-bold text-ellipsis overflow-hidden whitespace-nowrap">{restaurant.name}</h2>
                  <p className="text-ellipsis overflow-hidden">{restaurant.description}</p>
                  <p>{restaurant.address}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-5">
          <Link to="/add-restaurant" className="border-primary border rounded-md py-1 px-2 text-primary">
            + Add restaurant
          </Link>
        </div>
      </div>
    </>
  );
};
