import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";
import DishesComponent from "../../components/DishesComponent";
import Loading from "../../components/Loading";

export const ViewRestaurant = ({ setEdit, newImageUrl }) => {
  const { restaurants } = useContext(UserContext);
  const { restaurantId } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        let restaurantData = restaurants.find(
          (restaurant) => restaurant.id == restaurantId
        );


        

        setRestaurant(restaurantData);

        const carouselResponse = await axios.get(`/api/restaurant/carousel/${restaurantId}`);
        setCarouselImages(carouselResponse.data.map((img) => ({
          name: img,
          imageUrl: `${axios.defaults.baseURL}/api/restaurant/carousel/photo/${img}`
        })));

        setLoading(false);
      } catch (error) {
        
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [restaurantId, restaurants]);

  const handleOrderClick = (src) => {
    window.open(src, "_blank");
  };

  const GlovoBtn = ({ src }) => (
    <button
      className="bg-primary rounded-2xl py-2 h-14 items-center justify-center w-[70%]"
      onClick={() => handleOrderClick(src)}
    >
      <img
        src="/assets/glovo-logo.png"
        className="h-full w-30 mx-auto"
        alt="Glovo Logo"
      />
    </button>
  );

  const UberEatsBtn = ({ src }) => (
    <button
      className="bg-black rounded-2xl py-2 h-14 items-center justify-center w-[70%]"
      onClick={() => handleOrderClick(src)}
    >
      <img
        src="/assets/uber-eats-logo.png"
        className="h-full w-30 mx-auto"
        alt="Uber Eats Logo"
      />
    </button>
  );

  const JustEatBtn = ({ src }) => (
    <button
      className="bg-white rounded-2xl py-2 h-14 items-center justify-center w-[70%]"
      onClick={() => handleOrderClick(src)}
    >
      <img
        src="/assets/just-eat-logo.png"
        className="h-full w-30 mx-auto"
        alt="Just Eat Logo"
      />
    </button>
  );

  if (loading) {
    return <Loading isLoading={true} />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!restaurant) {
    return <div className="text-light text-center">Restaurant not found</div>;
  }

  return (
    <div className="w-full mx-auto flex flex-col">
      <div id="header" className="h-full border-b border-base-light">
        <div className="flex flex-col px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl text-light font-bold my-5">
              {restaurant.name}
            </h1>
            <div
              className="cursor-pointer flex items-center"
              onClick={() => setEdit(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m14.06 9l.94.94L5.92 19H5v-.92zm3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z"
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img
              className="h-36 w-36 rounded-full object-cover border border-light"
              src={newImageUrl ? newImageUrl : `${axios.defaults.baseURL}/api/restaurant/profilephoto/${restaurant.photo}`}
              alt="Restaurant"
            />
          </div>
          <div className="py-4">
            <p>{restaurant.address}</p>
          </div>
        </div>
      </div>
      <DishesComponent
        dishes={restaurant.dishes}
        editMode={false}
        restaurantId={restaurantId}
      />
      <div className="flex flex-col gap-2 p-4 border-b border-base-light">
        <label className="text-primary">Carousel</label>
        <div className="flex flex-wrap gap-3">
          {carouselImages.map((image, index) => (
            <div key={index} className="relative">
              <img src={image.imageUrl} alt="Carousel Image" className="w-28 h-28 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
      <div id="links" className="flex flex-col gap-2 p-4">
        <label className="text-primary">Order</label>
        <div className="flex flex-col items-center gap-2">
          {restaurant.link_glovo && (
            <GlovoBtn src={restaurant.link_glovo} />
          )}
          {restaurant.link_uber_eats && (
            <UberEatsBtn src={restaurant.link_uber_eats} />
          )}
          {restaurant.link_just_eat && (
            <JustEatBtn src={restaurant.link_just_eat} />
          )}
          {!restaurant.link_glovo &&
            !restaurant.link_uber_eats &&
            !restaurant.link_just_eat && (
              <p className="text-light text-center">
                No delivery services available for this restaurant
              </p>
            )}
        </div>
      </div>
    </div>
  );
};
