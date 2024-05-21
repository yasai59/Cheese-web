import React, { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import { Modal } from "../../components/Modal";
import { Input } from "../../components/Input";
import { AddPhoto } from "../../components/AddPhoto";
import { Tastes } from "../privatePages/yourRestaurantsComponents/Tastes";
import { Restrictions } from "../privatePages/yourRestaurantsComponents/Restrictions";
import { FormButton } from "../../components/FormButton";
import { resizeFile } from "../../helpers/resizer";
import axios from "axios";

export const AddDish = ({ isEditing, restaurantId }) => {
  const { updateRestaurants } = useContext(UserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [selectedTastes, setSelectedTastes] = useState([]);
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);  
  const [open, setOpen] = useState(false);


  const handleOpen = (isOpen) => {
    setOpen(isOpen);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!photo) {
      alert("Please add a photo");
      return;
    }

    const resized = await resizeFile(photo);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("photo", resized);
      formData.append("tastes", JSON.stringify(selectedTastes));
      formData.append("restrictions", JSON.stringify(selectedRestrictions));

      const res = await axios.post(`api/dish/${restaurantId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setName("");
      setDescription("");
      setPrice("");
      setPhoto("");
      setSelectedTastes([]);
      setSelectedRestrictions([]);
      updateRestaurants();
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <div className="border-b border-base-light">
        <div className="p-4 flex justify-between items-center gap-4">
          <label className="text-primary">Menu</label>
          {isEditing && (
            <button
              onClick={() => handleOpen(true)}
              className="rounded-md py-1 px-2 text-white bg-base"
            >
              Add dish
            </button>
          )}
        </div>
      </div>

      <Modal open={open} setOpen={setOpen}>
        <div className="bg-base-dark rounded-lg border-2 border-base relative">
          <h1 className="text-light font-bold text-xl mt-10 text-center">
            Add dish
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
              <AddPhoto setImageDef={setPhoto} />
            </div>
            <div className="flex flex-col">
              <Tastes selectedTastes={selectedTastes} setSelectedTastes={setSelectedTastes} />
            </div>
            <div className="flex flex-col">
              <Restrictions selectedRestrictions={selectedRestrictions} setSelectedRestrictions={setSelectedRestrictions} />
            </div>
            <div className="flex flex-col justify-center items-center">
              <FormButton title="Add Dish" className={`h-[40px] w-36 text-base mt-3 mb-5`} onClick={handleSubmit}/>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
