import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Restaurant = ({
  restaurant,
  isFavorite = false,
  onFavorite = () => { },
}) => {
  return (
    
      <div className="bg-base aspect-square rounded-lg p-5">
        <div className="self-end" onClick={onFavorite}>
          {isFavorite ? (
            <span role="img" aria-label="star" style={{ fontSize: '24px' }}>⭐️</span>
          ) : (
            <span role="img" aria-label="star" style={{ fontSize: '24px' }}>☆</span>
          )}
        </div>
        <img
          src={`${axios.defaults.baseURL}/api/restaurant/profilephoto/${restaurant.photo}`}
          className="w-16 h-16 rounded-xl mx-auto mt-2"
          alt={`${restaurant.name} profile`}
        />
        <p className="text-lime-50 text-center mt-2">{restaurant.name}</p>
        <p className="text-lime-50 text-center font-light">{restaurant.address}</p>
      </div>
    
  );
};

export const LikedHistory = () => {
  const [likedRestaurants, setLikedRestaurants] = useState([]);
  const { favoriteRestaurants, toggleFavorite } = useContext(UserContext);

  useEffect(() => {
    axios.get('/api/restaurant/liked-restaurants').then((res) => {
      setLikedRestaurants(res.data);
    });
  }, []);

  const handleFavorite = (restaurant) => {
    toggleFavorite(restaurant);
  };

  return (
    <div className="flex-1 bg-base-dark p-3">
      <h1 className="text-light text-4xl font-bold">Liked Restaurants</h1>
      <div className="flex mt-5 gap-2 flex-row flex-wrap justify-center">
        {likedRestaurants && likedRestaurants.map((restaurant) => (
          <div key={restaurant.id} className="w-64 mx-2 mb-4">
            <Restaurant
              restaurant={restaurant}
              isFavorite={favoriteRestaurants && favoriteRestaurants.some((res) => res.id === restaurant.id)}
              onFavorite={() => handleFavorite(restaurant)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
