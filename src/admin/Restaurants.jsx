import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Restaurant } from "./components/Restaurant";

export const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([
    { id: "0", loading: true },
    { id: "1", loading: true },
    { id: "2", loading: true },
    { id: "3", loading: true },
    { id: "4", loading: true },
    { id: "5", loading: true },
    { id: "6", loading: true },
    { id: "7", loading: true },
    { id: "8", loading: true },
    { id: "9", loading: true },
    { id: "10", loading: true },
    { id: "11", loading: true },
    { id: "12", loading: true },
    { id: "13", loading: true },
  ]);

  useEffect(() => {
    axios.get("/api/restaurant/getAll").then((res) => {
      setRestaurants(res.data.restaurants);
      console.log(res.data.restaurants);
    });
  }, []);

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
          .map((restaurant) => (
            <Restaurant restaurant={restaurant} key={restaurant.id} />
          ))}
      </div>
    </div>
  );
};
