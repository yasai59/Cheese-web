import axios from "axios";
import React from "react";
import { useState } from "react";
import { Modal } from "../../components/Modal";

export const Restaurant = ({ restaurant = {} }) => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    console.log(restaurant);
    setOpen((prev) => !prev);
  };

  if (restaurant.loading) {
    return (
      <div className="flex flex-col gap-4 w-52">
        <div className="flex gap-4 items-center">
          <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    );
  }

  const date = new Date(restaurant.creation_date);
  return (
    <>
      <div
        className="flex flex-col gap-4 w-64 cursor-pointer bg-base rounded-xl p-4"
        onClick={toggleModal}
      >
        <div className="flex gap-4 items-center">
          <img
            src={
              axios.defaults.baseURL +
              "/api/restaurant/profilephoto/" +
              restaurant.photo
            }
            alt={restaurant.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <div className="text-lg font-bold">{restaurant.name}</div>
            <div className="text-sm">{restaurant.address}</div>
          </div>
        </div>
        <div className="text-sm">
          <p>
            Created on {date.getDate()}/{date.getMonth() + 1}/
            {date.getFullYear()}
          </p>
          <p>{restaurant.description || "No description"}</p>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <div className="flex flex-col gap-4 p-4">
          <img
            src={
              axios.defaults.baseURL +
              "/api/restaurant/profilephoto/" +
              restaurant.photo
            }
            alt={restaurant.name}
            className="w-40 h-40 rounded-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <div className="text-lg font-bold">{restaurant.name}</div>
            <div className="text-sm">{restaurant.address}</div>
          </div>
          <div className="text-sm">
            <p>
              Created on {date.getDate()}/{date.getMonth() + 1}/
              {date.getFullYear()}
            </p>
            <p>{restaurant.description || "No description"}</p>
          </div>
        </div>
        {/* delete description and delete restaurant buttons */}
        <div className="flex gap-4 justify-end">
          <button className="btn btn-error">Delete description</button>
          <button className="btn btn-error">Delete restaurant</button>
        </div>
      </Modal>
    </>
  );
};
