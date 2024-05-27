import React from "react";
import { Option } from "./Option";
import { Modal } from "../../../components/Modal";
import { Input } from "../../../components/Input";
import axios from "axios";
import { useRef } from "react";

export const Password = () => {
  const [changePassword, setChangePassword] = React.useState(false);

  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const repeatPasswordRef = useRef(null);
  const errorRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const repeatPassword = repeatPasswordRef.current.value;

    if (newPassword !== repeatPassword) {
      errorRef.current.innerText = "Passwords don't match";
      return;
    }

    if (newPassword.length < 6) {
      errorRef.current.innerText =
        "Password must be at least 6 characters long";
      return;
    }

    axios
      .post("/api/user/change-password", {
        oldPassword,
        newPassword,
      })
      .then((res) => {
        setChangePassword(false);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          errorRef.current.innerText = err.response.data.message;
        } else {
          errorRef.current.innerText = "Server error";
        }
      });
  };

  return (
    <>
      <Option
        title="Password"
        content="***************"
        type="text"
        onClick={() => setChangePassword((prev) => !prev)}
      />
      <Modal open={changePassword} setOpen={setChangePassword}>
        <div className="flex flex-col">
          <h1 className="text-3xl text-light font-bold my-5">
            Change Password
          </h1>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <p ref={errorRef} className="text-red-500"></p>
            <label>Current password</label>
            <input
              type="password"
              className="bg-base text-base text-light placeholder:text-base-light rounded-md p-2 w-full h-[50px]"
              placeholder="Current password"
              ref={oldPasswordRef}
            />
            <label>New password</label>
            <input
              type="password"
              className="bg-base text-base text-light placeholder:text-base-light rounded-md p-2 w-full h-[50px]"
              placeholder="New password"
              ref={newPasswordRef}
            />
            <label>Repeat your password</label>
            <input
              type="password"
              className="bg-base text-base text-light placeholder:text-base-light rounded-md p-2 w-full h-[50px]"
              placeholder="Repeat new password"
              ref={repeatPasswordRef}
            />
            <button className="w-full bg-primary font-bold text-black py-3 rounded-lg">
              Change
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};
