import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Restaurant = ({
  restaurant,
  isFavorite = false,
  onFavorite = () => {},
  onClick = () => {},
}) => {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onFavorite(restaurant);
  };

  return (
    <div
      className={`bg-base w-full tablet:aspect-square rounded-lg p-5 cursor-pointer relative flex flex-col justify-center items-center`}
      onClick={onClick}
    >
      <div className="absolute top-2 right-2" onClick={handleFavoriteClick}>
        {isFavorite ? (
          <span role="img" aria-label="star" style={{ fontSize: '24px' }}>
            ⭐️
          </span>
        ) : (
          <span role="img" aria-label="star" style={{ fontSize: '24px' }}>
            ☆
          </span>
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
  const { favoriteRestaurants, toggleFavorite, addRestaurant } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/restaurant/liked-restaurants').then((res) => {
      setLikedRestaurants(res.data);
    });
  }, []);

  const handleFavorite = (restaurant) => {
    toggleFavorite(restaurant);
  };

  const handleClick = (restaurant) => {
    addRestaurant(restaurant);
    navigate(`/restaurant/${restaurant.id}`);
  };

  return (
    <div className="flex-1 bg-base-dark py-3">
      <h1 className="text-light text-4xl font-bold ms-5">Liked Restaurants</h1>
      <div className="flex mt-5 mb-3 gap-4 flex-row flex-wrap mx-5">
        {likedRestaurants &&
          likedRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="w-full tablet:w-64">
              <Restaurant
                restaurant={restaurant}
                isFavorite={favoriteRestaurants && favoriteRestaurants.some((res) => res.id === restaurant.id)}
                onFavorite={() => handleFavorite(restaurant)}
                onClick={() => handleClick(restaurant)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
