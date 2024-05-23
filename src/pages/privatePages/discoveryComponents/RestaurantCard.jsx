import axios from "axios";
import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";

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

  const controls = useAnimation();

  const handleChangePhoto = (sum) => {
    setActivePhoto((prev) => {
      let next = prev + sum;
      if (next < 0) next = 0;
      if (next >= totalImages) next = totalImages - 1;
      return next;
    });
  };

  const handleGoNext = (like) => {
    controls.start({
      x: like ? 600 : -600,
      rotate: like ? 45 : -45,
      opacity: 0,
      transition: { duration: 0.5 },
    });

    setTimeout(() => {
      controls.start({
        x: 0,
        rotate: 0,
        opacity: 1,
        transition: { duration: 0.5 },
      });
      setActivePhoto(0);
      goNext(like);
    }, 500);
  };

  return (
    <motion.div
      className="relative z-50 h-[80%] tablet:h-[90%] w-full tablet:max-w-lg mx-auto"
      animate={controls}
    >
      <div className="flex flex-row absolute z-50 h-full w-full justify-between rounded">
        <button
          className="absolute left-0 z-10 w-20 h-full"
          onClick={() => handleChangePhoto(-1)}
        />
        <div className="flex-grow" onClick={() => handleChangePhoto(1)} />
        <button
          className="absolute right-0 z-10 w-20 h-full"
          onClick={() => handleChangePhoto(1)}
        />
      </div>
      <div className="flex flex-row absolute mt-5 w-full gap-2 px-2 z-10">
        {restaurant.carousel_photos &&
          restaurant.carousel_photos.map((photo, index) => (
            <div
              key={index}
              className={`border-2 border-light flex-grow h-2 rounded-full ${
                index <= activePhoto ? "bg-light" : ""
              }`}
            />
          ))}
      </div>
      <div className="absolute top-0 w-full h-1/3 z-5 bg-gradient-to-b from-black via-transparent opacity-70" />
      <img
        src={`${axios.defaults.baseURL}/api/restaurant/carousel/photo/${restaurant.carousel_photos[activePhoto]}`}
        className="w-full h-full object-cover"
        alt="restaurant"
        onClick={() => handleChangePhoto(1)}
      />
      <div className="absolute bottom-0 z-5 mb-8 w-full">
        <div className="px-5 pb-2">
          <RestaurantDetails
            restaurant={restaurant}
            activePhoto={activePhoto}
          />
        </div>
        <div className="flex justify-around mt-4">
          <button
            className="bg-base w-20 h-20 flex items-center justify-center rounded-full z-50"
            onClick={() => handleGoNext(false)}
          >
            <img
              src="../../../assets/cross.png"
              className="w-10 h-10"
              alt="reject"
            />
          </button>
          <button
            className="bg-base w-20 h-20 flex items-center justify-center rounded-full z-50"
            onClick={() => handleGoNext(true)}
          >
            <img
              src="../../../assets/tick.png"
              className="w-13 h-10"
              alt="accept"
            />
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-1/2 z-1 bg-gradient-to-t from-black via-transparent opacity-85" />
    </motion.div>
  );
};

export default RestaurantCard;
