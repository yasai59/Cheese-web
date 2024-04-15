import axios from "axios";
import React from "react";
import { useState } from "react";
import { Modal } from "../../components/Modal";

export const User = ({ user = {}, setUser = () => {} }) => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen((prev) => !prev);
  };

  const handleEditEmail = () => {
    const email = prompt("Enter the new email address");

    if (!email) return;

    axios
      .put("/api/user", {
        id: user.id,
        email,
      })
      .then((res) => {
        setUser({ ...user, email });
      });
  };

  const handleDeleteUser = () => {
    const confirm = window.confirm("Are you sure you want to delete the user?");

    if (!confirm) return;

    axios.delete(`/api/user/${user.id}`).then((res) => {
      setUser(null);
    });
  };

  return (
    <>
      <div
        className="flex flex-col gap-4 w-64 cursor-pointer bg-base rounded-xl p-4"
        onClick={toggleModal}
      >
        <div className="flex gap-4 items-center flex-wrap">
          <img
            src={
              axios.defaults.baseURL + "/api/user/profilephoto/" + user.photo
            }
            alt={user.username}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <div className="text-lg font-bold">{user.username}</div>
            <div className="text-sm">{user.email}</div>
          </div>
        </div>
        <div className="text-sm">
          <p>{user.active === 1 ? "Verified email" : "Email not verified"}</p>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <div className="flex flex-col gap-4 p-4">
          <img
            src={
              axios.defaults.baseURL + "/api/user/profilephoto/" + user.photo
            }
            alt={user.username}
            className="w-40 h-40 rounded-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <div className="text-lg font-bold">{user.username}</div>
            <div className="text-sm">{user.address}</div>
          </div>
          <div className="text-sm">
            <p>{user.active === 1 ? "Verified email" : "Email not verified"}</p>
          </div>
          <div className="flex gap-4">
            <button className="btn btn-primary" onClick={handleEditEmail}>
              Edit email
            </button>
            <button className="btn btn-error" onClick={handleDeleteUser}>
              Delete user
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
