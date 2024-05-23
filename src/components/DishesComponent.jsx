import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Modal } from "./Modal";
import { Input } from "./Input";
import { AddPhoto } from "./AddPhoto";
import { Tastes } from "../pages/privatePages/yourRestaurantsComponents/Tastes";
import { Restrictions } from "../pages/privatePages/yourRestaurantsComponents/Restrictions";
import { resizeFile } from "../helpers/resizer";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import { Pill } from "./Pill";

const DishesComponent = ({ dishes = [], editMode }) => {
  const { updateRestaurants, tastes, restrictions } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [openDishScreen, setOpenDishScreen] = useState(false);
  const [editedDish, setEditedDish] = useState(null);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [selectedTastes, setSelectedTastes] = useState([]);
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);
  const [isNewImageSelected, setIsNewImageSelected] = useState(false);
  const [dish, setDish] = useState(null);

  const removeDish = async (id) => {
    try {
      await axios.delete(`/api/dish/${id}`);
      updateRestaurants();
    } catch (error) {
      console.error(error);
    }
  }

  const handleDishScreen = (dish) => {
    setDish(dish);
    setOpenDishScreen(true);
  }

  const editDish = (dish) => {
    setEditedDish(dish);
    setId(dish.id);
    setName(dish.name);
    setDescription(dish.description);
    setPrice(dish.price);
    setPhoto(`${axios.defaults.baseURL}/api/dish/photo/${dish.photo}`);
    setSelectedTastes(dish.tastes);
    setSelectedRestrictions(dish.restrictions);
    setOpen(true);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", name);
      formData.append("price", price);
      if (isNewImageSelected) {
        const resized = await resizeFile(photo);
        formData.append("photo", resized);
      }
      formData.append("description", description);
      formData.append("tastes", JSON.stringify(selectedTastes));
      formData.append("restrictions", JSON.stringify(selectedRestrictions));

      await axios.put(`/api/dish/${editedDish.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setOpen(false);
      updateRestaurants();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div id="dishes" className="flex flex-col border-b border-base-light p-4">
        <label className="text-primary">Dishes</label>
        {dishes.length === 0 && <p className="text-light text-center">No dishes available</p>}
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dishes.map((dish) => (
            <div key={dish.id} className="flex py-4 gap-4">
              <div>
                <img
                  className="h-20 w-20 rounded"
                  src={`${axios.defaults.baseURL}/api/dish/photo/${dish.photo}`}
                  alt={dish.name}
                />
              </div>
              <div>
                <p className="text-white font-bold text-lg">{dish.name}</p>
                <p className="text-light">{dish.price}€</p>
                {!editMode && <p className="text-primary cursor-pointer" onClick={() => handleDishScreen(dish)}>See more</p>}
              </div>
              {editMode && (
                <div className="ml-auto">
                  <div onClick={() => removeDish(dish.id)} className="cursor-pointer">
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
                  </div>
                  <div onClick={() => editDish(dish)}>
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
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <div className="bg-base-dark rounded-lg border-2 border-base relative">
          <h1 className="text-light font-bold text-xl mt-10 text-center">
            Edit dish
          </h1>
          <div className="flex flex-col w-[80%] mx-auto gap-2">
            <div className="flex flex-col">
              <label className="text-light text-sm">Name</label>
              <Input
                placeholder="Name"
                value={name}
                setValue={setName}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-light text-sm">Description</label>
              <Input
                placeholder="Description"
                value={description}
                setValue={setDescription}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-light text-sm">Price</label>
              <Input
                placeholder="Price"
                type="number"
                value={price}
                setValue={setPrice}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-light text-sm">Photo</label>
              <AddPhoto
                setImageDef={setPhoto}
                selectedImage={photo}
                setIsNewImageSelected={setIsNewImageSelected}
              />
            </div>
            <div className="flex flex-col">
              <Tastes
                selectedTastes={selectedTastes}
                setSelectedTastes={setSelectedTastes}
              />
            </div>
            <div className="flex flex-col">
              <Restrictions
                selectedRestrictions={selectedRestrictions}
                setSelectedRestrictions={setSelectedRestrictions}
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <button className={`h-[40px] w-36 text-base mt-3 mb-5 bg-primary rounded font-bold`} onClick={handleSubmit}>Submit Changes</button>
            </div>
          </div>
        </div>
      </Modal>

      {dish && (
        <Modal open={openDishScreen} setOpen={setOpenDishScreen} dish={dish}>
          <div className="bg-base-dark rounded-lg border-2 border-base relative">
            <div className="relative h-80">
              <img
                src={`${axios.defaults.baseURL}/api/dish/photo/${dish.photo}`}
                className="w-full h-80 absolute"
                alt={dish.name}
              />
              {/* <button
                style={`absolute top-5 left-5 z-50 rounded-full bg-[#0000007e]`}
                onClick={handleBack}
              >
                <AntDesign name="arrowleft" size={24} style={tw`text-light m-2`} />
              </button> */}
            </div>
            <div className="p-5">
              <p className="text-4xl text-light font-bold">{dish.name}</p>
              <p className="text-light font-light text-2xl">{dish.price}€</p>
              <p className="text-light font-bold text-lg">Description: </p>
              <p className="text-light font-light text-base">{dish.description}</p>
              <p className="text-light font-bold text-lg">Tastes: </p>
              <div className="flex-row flex-wrap gap-2">
                {dish.tastes?.map((taste) => {
                  return (
                    <Pill
                      key={taste.id}
                      text={taste.name}
                      activate={tastes.includes(taste.id)}
                    />
                  );
                })}
                {!dish.tastes || dish.tastes.length === 0 && (
                  <p className="text-light font-light text-base">No tastes set</p>
                )}
              </div>
              <p className="text-light font-bold text-lg">Restrictions: </p>
              <div className="flex-row flex-wrap gap-2">
                {dish.restrictions?.map((restriction) => {
                  return (
                    <Pill
                      key={restriction.id}
                      text={restriction.name}
                      active={restrictions.includes(restriction.id)}
                    />
                  );
                })}
                {!dish.restrictions || dish.restrictions.length === 0 && (
                  <p className="text-light font-light text-base">No alimentary restrictions</p>
                )}
              </div>
            </div>

          </div>
        </Modal>
      )}
    </>
  );
};

export default DishesComponent;
