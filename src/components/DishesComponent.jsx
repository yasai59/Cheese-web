import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DishesComponent = ({ dishes, editMode }) => {
  const [visibleDishes, setVisibleDishes] = useState(2);

  const loadMoreDishes = () => {
    const remainingDishes = dishes.length - visibleDishes;
    const additionalDishes = Math.min(2, remainingDishes);
    setVisibleDishes((prev) => prev + additionalDishes);
  };

  const loadLessDishes = () => {
    setVisibleDishes(2);
  };

  return (
    <div id="dishes" className="flex flex-col border-b border-base-light p-4">
      {dishes.slice(0, visibleDishes).map((dish) => (
        <div key={dish.dish_id} className="flex py-4 gap-4">
          <div>
            <img
              className="h-20 w-20 rounded"
              src={`${axios.defaults.baseURL}/api/dish/photo/${dish.photo}`}
              alt={dish.dish_name}
            />
          </div>
          <div>
            <p className="text-white font-bold text-lg">{dish.name}</p>
            <p className="text-light">{dish.price}€</p>
          </div>
          {editMode && (
            <div className="ml-auto">
              <Link to={`/delete-dish/${dish.dish_id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                  />
                </svg>
              </Link>
              <Link to={`/edit-dish/${dish.dish_id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m14.06 9l.94.94L5.92 19H5v-.92zm3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      ))}
      {dishes.length >= visibleDishes && (
        <div className="flex items-center">
          <div className="bg-base-light flex-grow h-[1px]"></div>
          {visibleDishes <= 2 && (
            <button
              onClick={loadMoreDishes}
              className="text-primary px-2 cursor-pointer"
            >
              View more
            </button>
          )}
          {visibleDishes > 2 && (
            <button
              onClick={loadLessDishes}
              className="text-primary px-2 cursor-pointer"
            >
              View less
            </button>
          )}
          <div className="bg-base-light flex-grow h-[1px]"></div>
        </div>
      )}
    </div>
  );
};

export default DishesComponent;
