import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading';
import { RestaurantCard } from './discoveryComponents/RestaurantCard';
import { LikedHistory } from './LikedHistory';

export const Discovery = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [arrLiked, setArrLiked] = useState([]);
  const [final, setFinal] = useState(false);
  const [activeRestaurant, setActiveRestaurant] = useState(0);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setFinal(false);
    setArrLiked([]);
    setActiveRestaurant(0);
    setRestaurants([]);
    axios.get("/api/restaurant/getRecommendations").then((res) => {
      if (res.data.recomendations.length === 0) {
        setRestaurants("No restaurants found");
      } else {
        setRestaurants(res.data.recomendations);
      }
    });
  }, [update]);

  const handleUpdate = () => {
    setUpdate((prev) => !prev);
  };

  const goNext = (liked = false) => {
    if (liked) {
      axios.post(
        "/api/restaurant/like-restaurant/" + restaurants[activeRestaurant].id
      );
      setArrLiked((prev) => [...prev, restaurants[activeRestaurant]]);
    }

    if (activeRestaurant === restaurants.length - 1) {
      setFinal(true);
      return;
    }

    setActiveRestaurant((prev) => {
      let next = prev + 1;
      if (next >= restaurants.length) {
        next = 0;
      }
      return next;
    });
  };

  if (final) {
    return (
      <div className="flex-1 bg-base-dark border-t border-base-light">
        <LikedHistory restaurants={arrLiked} handleNext={handleUpdate} />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-base-dark border-t border-base-light">
      {restaurants === "No restaurants found" && (
        <div className="flex-1 items-center justify-center">
          <p className="text-light text-2xl">We ran out of restaurants!</p>
          <p className="text-light text-lg">Come tomorrow to see more!</p>
        </div>
      )}
      {restaurants.length === 0 ? (
        <Loading isLoading={true} />
      ) : (
        <RestaurantCard restaurant={restaurants[activeRestaurant]} goNext={goNext} />
      )}
    </div>
  );
};