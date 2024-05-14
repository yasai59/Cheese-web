import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal } from "./Modal";
import { Input } from "./Input";
import { AddPhoto } from "./AddPhoto";
import { Tastes } from "../pages/privatePages/yourRestaurantsComponents/Tastes";
import { Restrictions } from "../pages/privatePages/yourRestaurantsComponents/Restrictions";
import { resizeFile } from "../helpers/resizer";
import UserContext from "../context/UserContext";


const DishesComponent = ({ dishes, editMode }) => {
  const { updateRestaurants } = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [editedDish, setEditedDish] = useState(null);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [selectedTastes, setSelectedTastes] = useState([]);
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);
  const [isNewImageSelected, setIsNewImageSelected] = useState(false);

  console.log(photo);

  const removeDish = async (id) => {
    try {
      const res = await axios.delete(`/api/dish/${id}`);
      updateRestaurants();
    } catch (error) {
      console.error(error);
    }
  }

  const editDish = (dish) => {
    console.log(isNewImageSelected);
    setEditedDish(dish);
    setId(dish.id)
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
      formData.append("id", id)
      formData.append("name", name);
      formData.append("price", price);

      if (isNewImageSelected) {
        const resized = await resizeFile(photo);
        formData.append("photo", resized);
      }
      // if (typeof photo === 'string') {
      //   // Si es una URL (imagen existente), simplemente agrega la URL al FormData
      //   console.log("string");
      //   formData.append("photo", photo);
      // } else {
      //   // Si es un Blob (imagen nueva), redimensiona y agrega el Blob al FormData
      //   console.log("blob");
      //   const resized = await resizeFile(photo);
      //   formData.append("photo", resized);
      // }      
      formData.append("description", description);
      formData.append("tastes", JSON.stringify(selectedTastes));
      formData.append("restrictions", JSON.stringify(selectedRestrictions));

      const res = await axios.put(`/api/dish/${editedDish.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);


      setOpen(false);
      updateRestaurants();      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div id="dishes" className="flex flex-col border-b border-base-light p-4">
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
    </>
  );
};

export default DishesComponent;
