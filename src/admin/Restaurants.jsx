import React from "react";
import { useState } from "react";
import { Restaurant } from "./components/Restaurant";

export const Restaurants = ({ restaurants, setRestaurants }) => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <h1 className="text-5xl font-bold mb-10 ml-5 mt-5">Restaurants</h1>
      <div className="w-full flex justify-center">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered input-md w-[70%]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-5 flex-wrap m-5">
        {restaurants
          .filter(
            (restaurant) =>
              restaurant.name?.toLowerCase().includes(search.toLowerCase()) ||
              restaurant.address?.toLowerCase().includes(search.toLowerCase())
          )
          .map((restaurant, index) => {
            const setRestaurant = (payload) => {
              setRestaurants((prev) => {
                const arr1 = prev.slice(0, index);
                let arr2 = [];
                if (index <= prev.length - 1) {
                  arr2 = prev.slice(index + 1);
                }

                if (!payload) return [...arr1, ...arr2];

                return [...arr1, payload, ...arr2];
              });
            };

            return (
              <Restaurant
                restaurant={restaurant}
                key={restaurant.id}
                setRestaurant={setRestaurant}
              />
            );
          })}
      </div>
    </div>
  );
};
