import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import { RestaurantCard } from "./discoveryComponents/RestaurantCard";
import { LikedRestaurants } from "./LikedRestaurants";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router";

export const Discovery = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [arrLiked, setArrLiked] = useState([]);
  const [final, setFinal] = useState(false);
  const [activeRestaurant, setActiveRestaurant] = useState(0);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { token, tastes, restrictions } = useContext(UserContext);
  useEffect(() => {
    if (!localStorage.getItem("discover")) {
      if (tastes.length === 0 || restrictions.length === 0) {
        navigate("/your-profile");
        localStorage.setItem("discover", true);
      }
    }
  }, []);

  let active = true;
  useEffect(() => {
    setFinal(false);
    setArrLiked([]);
    setActiveRestaurant(0);
    setRestaurants([]);
    if (token) {
      setTimeout(() => {
        active = true;
      }, 1000);
      if (!active) return;
      active = false;
      axios
        .get("/api/restaurant/getRecommendations")
        .then((res) => {
          setLoading(false);
          if (res.data.recomendations.length === 0) {
            if (restaurants.length === 0)
              setRestaurants("No restaurants found");
          } else {
            if (restaurants.length === 0)
              setRestaurants(res.data.recomendations);
          }
        })
        .catch(() => {
          setLoading(false);
          setRestaurants("No restaurants found");
        });
    }
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
      <div className="flex-1 h-screen bg-base-dark border-t border-base-light">
        <LikedRestaurants restaurants={arrLiked} handleNext={handleUpdate} />
      </div>
    );
  }

  return (
    <div className="flex-1 h-screen bg-base-dark border-t border-base-light flex flex-col items-center tablet:justify-center tablet:p-4 overflow-hidden">
      {restaurants === "No restaurants found" ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-light text-2xl">We ran out of restaurants!</p>
          <p className="text-light text-lg">Come tomorrow to see more!</p>
        </div>
      ) : loading ? (
        <Loading isLoading={true} />
      ) : (
        <RestaurantCard
          restaurant={restaurants[activeRestaurant]}
          goNext={goNext}
        />
      )}
    </div>
  );
};
