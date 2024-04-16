import axios from "axios";
import React from "react";
import { useState } from "react";
import { Modal } from "../../components/Modal";

export const User = ({ user = {}, setUser = () => {} }) => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen((prev) => !prev);
  };

  const roles = ["", "Client", "Restaurant Owner", "Admin"];

  const handleEditEmail = () => {
    const email = prompt("Enter the new email address");

    if (!email) return;

    axios
      .put("/api/user/admin", {
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

    axios
      .delete(`/api/user/admin/${user.id}`)
      .then((res) => {
        setUser({ ...user, active: 0 });
      })
      .catch((e) => {
        console.log(e);
        alert("Error deleting user");
      });
  };

  const handleActivateAccount = () => {
    axios
      .put("/api/user/admin", {
        id: user.id,
        active: 1,
      })
      .then((res) => {
        setUser({ ...user, active: 1 });
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
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-bold">{user.username}</div>
          <div className="text-sm">{user.email}</div>
        </div>
        <div className="text-sm">
          <p>{user.verified === 1 ? "Verified email" : "Email not verified"}</p>
        </div>
        <div className="text-sm">
          <p className="font-bold text-secondary">
            {user.active === 1 ? "" : "Deactivated account"}
          </p>
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
            <p>
              {user.verified === 1 ? "Verified email" : "Email not verified"}
            </p>
          </div>
          <div className="text-sm">
            <p>{user.email}</p>
          </div>
          <div className="text-sm">
            <p>number of restaurants in discover: {user.lot_number}</p>
          </div>
          <div className="text-sm">
            <p>Role: {roles[user.role_id]}</p>
          </div>
          <div className="text-sm">
            <p className="font-bold text-secondary">
              {user.active === 1 ? "" : "Deactivated account"}
            </p>
          </div>
          <div className="flex gap-4">
            <button className="btn btn-primary" onClick={handleEditEmail}>
              Edit email
            </button>
            {user.active === 1 ? (
              <button className="btn btn-error" onClick={handleDeleteUser}>
                Deactivate account
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={handleActivateAccount}
              >
                Activate account
              </button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
