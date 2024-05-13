import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import { Link } from 'react-router-dom';

const Restaurant = ({
  restaurant,
  isFavourite = false,
  onFavorite = () => { },
}) => {
  return (
    <div
      className="bg-base aspect-square rounded-lg p-5"
    >
      <div className="self-end" onClick={onFavorite}>
        {isFavourite ? (
          <span role="img" aria-label="star" style={{ fontSize: '24px' }}>⭐️</span>
        ) : (
          <span role="img" aria-label="star" style={{ fontSize: '24px' }}>☆</span>
        )}
      </div>

      <img
        src={`${axios.defaults.baseURL}/api/restaurant/profilephoto/${restaurant.photo}`}
        className="w-16 h-16 rounded-xl mx-auto mt-2"
      />
      <p className="text-lime-50 text-center mt-2">{restaurant.name}</p>
      <p className="text-lime-50 text-center font-light">{restaurant.address}</p>
    </div>
  );
};

export const FavoriteRestaurants = () => {
  const { favoriteRestaurants, toggleFavorite } =
    useContext(UserContext);

  const [search, setSearch] = useState("");

  console.log(favoriteRestaurants);

  const handleFavorite = (restaurant) => {
    toggleFavorite(restaurant);
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
                onPress={() => handlePress(restaurant)}
                onFavorite={() => handleFavorite(restaurant)}
              />
            </div>
          ))
        }
      </div>
    </div>
  );
};
