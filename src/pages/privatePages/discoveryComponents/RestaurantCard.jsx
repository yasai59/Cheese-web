import axios from "axios";
import React, { useState } from "react";

const RestaurantDetails = ({ restaurant, activePhoto }) => {
  const details = [
    <>
      <h2 className="text-white text-2xl font-bold">{restaurant.name}</h2>
      <p className="text-white text-lg">{restaurant.address}</p>
    </>,
    <>
      <p className="text-white text-lg">{restaurant.description}</p>
    </>,
    <>
      <p className="text-white text-lg">
        <span className="font-bold">Phone:</span> {restaurant.phone}
      </p>
      <p className="text-white text-lg">
        <span className="font-bold">In Cheese since:</span>{" "}
        {restaurant.creation_date}
      </p>
    </>,
    <>
      <p className="text-white text-lg">
        <span className="font-bold">Delivery options:</span>{" "}
        {restaurant.link_glovo && <span className="text-white">Glovo </span>}
        {restaurant.link_ubereats && (
          <span className="text-white">& Uber Eats </span>
        )}
        {restaurant.link_just_eat && (
          <span className="text-white">& Just Eat </span>
        )}
      </p>
    </>,
  ];

  return details[activePhoto % details.length];
};

export const RestaurantCard = ({ restaurant, goNext }) => {
  const totalImages = restaurant.carousel_photos?.length || 0;

  const [activePhoto, setActivePhoto] = useState(0);

  const handleChangePhoto = (sum) => {
    if (activePhoto + sum < 0) {
      setActivePhoto(0);
    } else if (activePhoto + sum >= totalImages) {
      setActivePhoto(totalImages - 1);
    } else {
      setActivePhoto(activePhoto + sum);
    }
  };

  return (
    <div className="relative z-50 h-[84%] w-full">
      <div className="flex-row absolute z-50 h-full w-full">
        <button
          className="z-10 w-20 h-full"
          onClick={() => handleChangePhoto(-1)}
        />
        <div
          className="flex-grow"
          draggable={true}
          onDrag={handleChangePhoto}
          onDragEnd={() => handleChangePhoto(-1)}
        />
        <button
          className="z-10 w-20 h-full"
          onClick={() => handleChangePhoto(1)}
        />
      </div>
      <div className="flex flex-row absolute mt-5 w-full gap-2 px-2 z-10">
        {restaurant.carousel_photos && restaurant.carousel_photos.map((photo, index) => (
          <div
            key={index}
            className={`border-2 border-light flex-grow h-2 rounded-full ${
              index <= activePhoto ? "bg-light" : ""
            }`}
          />
        ))}
      </div>
      <div className="absolute top-0 w-full h-30 z-5 opacity-50 gradient-top" />
      <img
        src={restaurant.carousel_photos && `${axios.defaults.baseURL}/api/restaurant/carousel/photo/${restaurant.carousel_photos[activePhoto]}`}
        className="w-full h-full"
      />
      <div className="absolute bottom-0 z-5 mb-8 w-full">
        <div className="px-5 pb-2">
          <RestaurantDetails restaurant={restaurant} activePhoto={activePhoto} />
        </div>
        <div className="flex-row justify-around w-full">
          <button
            className="bg-base w-20 h-20 items-center justify-center rounded-full z-50"
            onClick={() => goNext(false)}
          >
            <img
              src="../../../assets/cross.png"
              className="w-10 h-10"
            />
          </button>
          <button
            className="bg-base w-20 h-20 items-center justify-center rounded-full z-50"
            onClick={() => goNext(true)}
          >
            <img
              src="../../../assets/tick.png"
              className="w-13 h-10"
            />
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-50 z-1 gradient-bottom opacity-85" />
    </div>
  );
};
