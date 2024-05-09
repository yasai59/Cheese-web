import React from "react";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import DishesComponent from "../../components/DishesComponent";
import { ImageCarousel } from "../../components/ImageCarousel";
import { LinkButton } from "../../components/LinkButton";
import { useRef } from "react";
import { AddDish } from "./AddDish";

export const EditRestaurant = ({ setEdit }) => {
  const { restaurants } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const { restaurantId } = useParams();
  const restaurant = restaurants.find(
    (restaurant) => restaurant.id == restaurantId
  );
  const [dishes, setDishes] = useState(restaurant.dishes);

  const isOwner = user.id === restaurant.owner_id;

  const handleEdit = () => {
    setEdit(false);
  };

  const image = useRef(null);

  /* Mostrar imagen al editar una existente */
  const urlImagen = `${axios.defaults.baseURL}/api/restaurant/profilephoto/${restaurant.photo}`;
  const styles = {
    backgroundImage: `url(${urlImagen})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const handleChangeImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("id", restaurant.id);
      try {
        await axios.post(
          `/api/restaurant/photo/profile-picture/${restaurant.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const url = URL.createObjectURL(file);
        image.current.style.backgroundImage = `url(${url})`;
      } catch (error) {
        console.error(error);
      }
    };
    input.click();
  };

  const [restaurantAddress, setRestaurantAddress] = useState(
    restaurant.address
  );

  const [carousel, setCarousel] = useState([]);
  useEffect(() => {
    axios
      .get("/api/restaurant/carousel/" + restaurant.id)
      .then((res) => {
        const images = res.data.map((image) => {
          return {
            uri: `${axios.defaults.baseURL}/api/restaurant/carousel/${image}`,
            type: "image/png",
            name: image,
          };
        });
        setCarousel(images);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const [glovoLink, setGlovoLink] = useState(restaurant.link_glovo || "");
  const [uberEatsLink, setUberEatsLink] = useState(
    restaurant.link_uber_eats || ""
  );
  const [justEatLink, setJustEatLink] = useState(
    restaurant.link_just_eat || ""
  );

  return (
    <>
      {/* Header */}
      <div className="w-full mx-auto flex flex-col">
        <div id="header" className="h-full border-b border-base-light">
          <div className="flex flex-col px-4">
            <button className="bg-primary flex justify-center items-center p-1 rounded w-16 text-base-dark mt-6">
              Save
            </button>
            <div className="flex justify-between items-center">
              <h1 className="text-4xl text-light font-bold my-5">
                {restaurant.name}
              </h1>
              <div className="cursor-pointer" onClick={() => handleEdit()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"
                  />
                </svg>
              </div>
            </div>
            {/* Image */}
            <div className="flex justify-center items-center">
              <div
                className="w-36 h-36 rounded-full cursor-pointer mx-auto border border-light bg-center bg-cover bg-no-repeat"
                ref={image}
                onClick={handleChangeImage}
                style={styles}
              ></div>
            </div>
            <div className="py-4">
              <input
                type="text"
                value={restaurantAddress}
                className="p-1 rounded-sm"
                onChange={(e) => setRestaurantAddress(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Menu + AddDish */}
        <AddDish isEditing={true} restaurantId={restaurant.id} />
        {/* Dishes */}
        <DishesComponent
          dishes={dishes}
          editMode={true}
          restaurantId={restaurantId}
        />
        {/* Carousel */}
        <div className="flex flex-col gap-2 p-4">
          <label className="text-primary">Carousel</label>
          <ImageCarousel setDefCarousel={setCarousel} />
        </div>
        <hr className="border-b-1 border-base-light" />
        {/* Links + Orders */}
        <div id="links" className="flex flex-col gap-2 p-4">
          <div className="flex flex-col gap-2">
            <label className="text-primary">Links</label>
            <LinkButton
              src="glovo-icon"
              originalText={glovoLink}
              onSave={setGlovoLink}
            ></LinkButton>
            <LinkButton
              src="uber-eats-icon"
              originalText={uberEatsLink}
              onSave={setUberEatsLink}
            ></LinkButton>
            <LinkButton
              src="just-eat-icon"
              originalText={justEatLink}
              onSave={setJustEatLink}
            ></LinkButton>
          </div>
        </div>
      </div>
    </>
  );
};
