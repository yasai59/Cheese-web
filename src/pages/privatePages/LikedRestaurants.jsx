import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RestaurantItem = ({ restaurant }) => {
    const { addRestaurant } = useContext(UserContext);
    const navigate = useNavigate();

    const handlePress = (id) => {
        addRestaurant(restaurant);
        navigate(`/restaurant/${id}`);
    };

    return (
        <div
            className="bg-base m-2 p-8 rounded-lg cursor-pointer flex flex-col justify-center items-center w-full sm:w-64"
            onClick={() => handlePress(restaurant.id)}
        >
            <img
                src={`${axios.defaults.baseURL}/api/restaurant/profilephoto/${restaurant.photo}`}
                alt={restaurant.name}
                className="w-20 h-20 rounded-lg mx-auto"
            />
            <div className="flex flex-col justify-between items-center mt-2">
                <h2 className="text-lime-50 text-2xl font-bold text-center truncate w-full">{restaurant.name}</h2>
                <p className="text-lime-50 text-lg text-center">{restaurant.address}</p>
            </div>
        </div>
    );
};


export const LikedRestaurants = ({ restaurants, handleNext }) => {
    return (
        <div className="flex-1 bg-base-dark py-3 h-screen overflow-y-auto">
            <h1 className="text-light text-4xl font-bold ms-5">Selected Restaurants</h1>
            <div className="flex mt-5 mb-3 gap-4 flex-row flex-wrap mx-5">
                {restaurants.map((restaurant) => (
                    <RestaurantItem restaurant={restaurant} key={restaurant.id} isFavourite={true} />
                ))}
            </div>
            <div className="flex justify-center my-4">
                <button
                    className="border border-primary py-1 px-5 rounded-lg text-primary"
                    onClick={handleNext}
                >
                    Search more
                </button>
            </div>
        </div>
    );
};

