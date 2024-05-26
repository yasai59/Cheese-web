import React, { useContext, useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";
import DishesComponent from "../../components/DishesComponent";
import { ImageCarousel } from "../../components/ImageCarousel";
import { LinkButton } from "../../components/LinkButton";
import { AddDish } from "./AddDish";
import { resizeFile } from "../../helpers/resizer";

export const EditRestaurant = ({ setEdit, setNewImageUrl }) => {
  const { restaurants, setRestaurants, user } = useContext(UserContext);
  const { restaurantId } = useParams();
  const restaurant = restaurants.find((restaurant) => restaurant.id == restaurantId);
  const [dishes, setDishes] = useState(restaurant.dishes || []);
  const [url, setUrl] = useState(restaurant.photo || "");
  const [newImage, setNewImage] = useState(false);
  const [restaurantAddress, setRestaurantAddress] = useState(restaurant.address || "");
  const [phoneNumber, setPhoneNumber] = useState(restaurant.phone || "");
  const [glovoLink, setGlovoLink] = useState(restaurant.link_glovo || "");
  const [uberEatsLink, setUberEatsLink] = useState(restaurant.link_uber_eats || "");
  const [justEatLink, setJustEatLink] = useState(restaurant.link_just_eat || "");
  const [carousel, setCarousel] = useState([]);
  const image = useRef(null);

  useEffect(() => {
    axios
      .get(`/api/restaurant/carousel/${restaurantId}`)
      .then((response) => {
        setCarousel(response.data.map((img) => ({
          name: img,
          imageUrl: `${axios.defaults.baseURL}/api/restaurant/carousel/photo/${img}`
        })));
        console.log("Carousel images:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching carousel images:", error);
      });
  }, []);

  const handleEdit = () => {
    setEdit(false);
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
        image.current.src = url;
        setNewImage(true);
        setUrl(url);
        setNewImageUrl(url);
        setEdit(false);
      } catch (error) {
        console.error(error);
      }
    };
    input.click();
  };

  
  const updateImages = async (images) => {
  const formData = new FormData();

  images.forEach((image) => {
    if (image.resized) {
      const fileName = `${user.username}_${Date.now()}_${Math.floor(Math.random() * 10000)}.${image.resized.name.split('.').pop()}`;
      formData.append('photo', image.resized, fileName);
    } else if (image.imageUrl) {
      console.log('Image URL:', image.imageUrl);
      formData.append('photo', image.imageUrl);
    }
  });

  try {
    const res = await axios.put(
      `/api/restaurant/photo/carousel/${restaurant.id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log('Server response:', res.data);
  } catch (e) {
    console.error('Error uploading images:', e);
  }
};

 


  const handleSave = async () => {
    console.log("Handle Save called");
    const updatedRestaurant = {
      id: restaurant.id,
      address: restaurantAddress,
      phone_number: phoneNumber,
      link_glovo: glovoLink,
      link_uber_eats: uberEatsLink,
      link_just_eat: justEatLink,
    };

    console.log("Updated data:", updatedRestaurant);

    try {
      const response = await axios.put(`/api/restaurant`, updatedRestaurant);

      console.log("Save Response:", response.data);

      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((rest) =>
          rest.id === restaurant.id ? { ...rest, ...updatedRestaurant } : rest
        )
      );

      setEdit(false);
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  return (
    <>
      <div className="w-full mx-auto flex flex-col">
        <div id="header" className="h-full border-b border-base-light">
          <div className="flex flex-col px-4">
            <button
              className="bg-primary flex justify-center items-center p-1 rounded w-16 text-base-dark mt-6"
              onClick={handleSave}
            >
              Save
            </button>
            <div className="flex justify-between items-center">
              <h1 className="text-4xl text-light font-bold my-5">
                {restaurant.name}
              </h1>
              <div className="cursor-pointer" onClick={handleEdit}>
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
              <img
                ref={image}
                className="w-36 h-36 rounded-full cursor-pointer mx-auto border border-light"
                src={url}
                onClick={handleChangeImage}
              />
            </div>

            <div className="py-4">
              <input
                type="text"
                value={restaurantAddress}
                className="p-1 rounded-sm"
                onChange={(e) => setRestaurantAddress(e.target.value)}
              />
            </div>
            <div className="pb-4">
              <input
                type="tel"
                value={phoneNumber}
                className="p-1 rounded-sm"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
        </div>
        <AddDish isEditing={true} restaurantId={restaurant.id} />
        <DishesComponent
          dishes={dishes}
          editMode={true}
          restaurantId={restaurantId}
        />
        
        <div className="flex flex-col gap-2 p-4">
          <label className="text-primary">Carousel</label>
          <ImageCarousel setDefCarousel={updateImages} initialImages={carousel} />
        </div>
        <hr className="border-b-1 border-base-light" />
        <div id="links" className="flex flex-col gap-2 p-4">
          <div className="flex flex-col gap-2">
            <label className="text-primary">Links</label>
            <LinkButton
              src="glovo-icon"
              originalText={glovoLink}
              onSave={setGlovoLink}
            />
            <LinkButton
              src="uber-eats-icon"
              originalText={uberEatsLink}
              onSave={setUberEatsLink}
            />
            <LinkButton
              src="just-eat-icon"
              originalText={justEatLink}
              onSave={setJustEatLink}
            />
          </div>
        </div>
      </div>
    </>
  );
};
