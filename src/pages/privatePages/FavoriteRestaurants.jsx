import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const Restaurant = ({ 
  restaurant, 
  isFavourite = false, 
  onFavorite = () => {}, 
  onClick = () => {} 
}) => {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onFavorite(restaurant);
  };

  return (
    <div
      className="bg-base aspect-square rounded-lg p-5 relative cursor-pointer"
      onClick={onClick}
    >
      <div className="absolute top-2 right-2 z-10" onClick={handleFavoriteClick}>
        {isFavourite ? (
          <span role="img" aria-label="star" style={{ fontSize: '24px' }}>⭐️</span>
        ) : (
          <span role="img" aria-label="star" style={{ fontSize: '24px' }}>☆</span>
        )}
      </div>
      <img
        src={`${axios.defaults.baseURL}/api/restaurant/profilephoto/${restaurant.photo}`}
        className="w-16 h-16 rounded-xl mx-auto mt-2"
        alt={restaurant.name}
      />
      <p className="text-lime-50 text-center mt-2">{restaurant.name}</p>
      <p className="text-lime-50 text-center font-light">{restaurant.address}</p>
    </div>
  );
};

export const FavoriteRestaurants = () => {
  const { favoriteRestaurants, addRestaurant, toggleFavorite } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleFavorite = (restaurant) => {
    toggleFavorite(restaurant);
  };

  const handleClick = (restaurant) => {
    addRestaurant(restaurant);
    navigate(`/restaurant/${restaurant.id}`);
  };

  return (
    <div className="flex-1 bg-base-dark p-3">
      <h1 className="text-light text-4xl font-bold">Favorite Restaurants</h1>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-4 bg-base border border-gray-300 rounded-lg py-2 px-4 w-full max-w-sm mx-auto focus:outline-none"
      />
      <div className="flex mt-5 gap-2 flex-row flex-wrap justify-center">
        {favoriteRestaurants && favoriteRestaurants
          .filter((res) => {
            return (
              res.name.toLowerCase().includes(search.toLowerCase()) ||
              res.address.toLowerCase().includes(search.toLowerCase())
            );
          })
          .map((restaurant) => (
            <div key={restaurant.id} className="w-64 mx-2 mb-4">
              <Restaurant
                restaurant={restaurant}
                isFavourite={true}
                onFavorite={() => handleFavorite(restaurant)}
                onClick={() => handleClick(restaurant)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
