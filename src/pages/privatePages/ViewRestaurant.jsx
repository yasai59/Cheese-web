import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";
import DishesComponent from "../../components/DishesComponent";
import Loading from "../../components/Loading";
import { Modal } from "../../components/Modal";
import { Reasons } from "../../components/Reasons";


export const ViewRestaurant = ({ setEdit, newImageUrl }) => {
  const { restaurants, user, favoriteRestaurants, toggleFavorite, reasons } = useContext(UserContext);
  const { restaurantId } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carouselImages, setCarouselImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);


  const handleOpen = (isOpen) => {
    setOpen(isOpen);
  };

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
    let url = src;
    if (!/^https?:\/\//i.test(url)) {
      url = `http://${url}`;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };
  

  const GlovoBtn = ({ src }) => (
    <button
      className="bg-primary rounded-2xl py-2 h-14 items-center justify-center w-[70%] tablet:w-64"
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
      className="bg-black rounded-2xl py-2 h-14 items-center justify-center w-[70%] tablet:w-64"
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
      className="bg-white rounded-2xl py-2 h-14 items-center justify-center w-[70%] tablet:w-64"
      onClick={() => handleOrderClick(src)}
    >
      <img
        src="/assets/just-eat-logo.png"
        className="h-full w-30 mx-auto"
        alt="Just Eat Logo"
      />
    </button>
  );

  const handleReport = () => {
    if (selectedReasons.length === 0) {
      alert("Please select at least 1 reason");
      return;
    }

    axios
      .post("/api/report/" + restaurant.id, {
        reasonIds: selectedReasons.map((r) => r.id),
        description,
      })
      .then(() => {
        alert("Report sent successfully");
        setOpen(false);
        setDescription("");
        setSelectedReasons([]);
      });
  };

  if (loading) {
    return <Loading isLoading={true} />;
  }
  
  if (!restaurant) {
    return <div className="text-light text-center">Restaurant not found</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="w-full mx-auto flex flex-col">
      <div id="header" className="h-full border-b border-base-light">
        <div className="flex flex-col px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl text-light font-bold my-5">
              {restaurant.name}
            </h1>
            {restaurant.owner_id === user.id && setEdit ? (
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
            ) : (
              <div className="flex gap-5">
                <div className="cursor-pointer" onClick={() => toggleFavorite(restaurant)}>
                  {favoriteRestaurants.find((r) => r.id === restaurant.id) ? (
                    <span role="img" aria-label="star" style={{ fontSize: '24px' }}>⭐️</span>
                  ) : (
                    <span role="img" aria-label="star" style={{ fontSize: '24px' }}>☆</span>
                  )}
                </div>
                <div className="cursor-pointer flex justify-center items-center" onClick={() => handleOpen(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17q.425 0 .713-.288T13 16t-.288-.712T12 15t-.712.288T11 16t.288.713T12 17m0-4q.425 0 .713-.288T13 12V8q0-.425-.288-.712T12 7t-.712.288T11 8v4q0 .425.288.713T12 13m-2.925 8q-.4 0-.762-.15t-.638-.425l-4.1-4.1q-.275-.275-.425-.638T3 14.926v-5.85q0-.4.15-.762t.425-.638l4.1-4.1q.275-.275.638-.425T9.075 3h5.85q.4 0 .763.15t.637.425l4.1 4.1q.275.275.425.638t.15.762v5.85q0 .4-.15.763t-.425.637l-4.1 4.1q-.275.275-.638.425t-.762.15zm.025-2h5.8l4.1-4.1V9.1L14.9 5H9.1L5 9.1v5.8zm2.9-7" /></svg>
                </div>
              </div>
            )}
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
          <div className="pb-4">
            <p>{restaurant.phone && restaurant.phone}</p>
          </div>
        </div>
      </div>
      <DishesComponent
        dishes={restaurant.dishes}
        editMode={false}
        restaurantId={restaurantId}
      />
      <div>
        
      </div>
      {/* <div className="flex flex-col gap-2 p-4 border-b border-base-light">
        <label className="text-primary">Carousel</label>
        <div className="flex flex-wrap gap-3">
          {carouselImages.map((image, index) => (
            <div key={index} className="relative">
              <img src={image.imageUrl} alt="Carousel Image" className="w-28 h-28 rounded-xl" />
            </div>
          ))}
        </div>
      </div> */}
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

      <Modal open={open} setOpen={setOpen}>
        <div className="bg-base-dark rounded-lg border-2 border-base relative p-4">
          <h1 className="text-light font-bold text-xl my-5 text-center">
            Report
          </h1>
          <p className="text-light mb-2">Please select at least 1 reason</p>
        <Reasons
          selectedReasons={selectedReasons}
          setSelectedReasons={setSelectedReasons}
        />
        <p className="text-light mb-2 mt-5">Please describe your problem</p>
        <textarea
          className="h-30 w-full p-2 text-light"
          placeholder="Description of your problem"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="bg-primary p-3 rounded-lg my-5 w-1/2 mx-auto"
          onClick={handleReport}
        >
          <span className="text-black text-center font-bold text-xl">
            Report
          </span>
        </button>
        </div>
      </Modal>
    </div>
  );
};
