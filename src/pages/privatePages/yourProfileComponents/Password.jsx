import React from "react";
import { Option } from "./Option";
import { Modal } from "../../../components/Modal";
import { Input } from "../../../components/Input";

export const Password = () => {
  const [changePassword, setChangePassword] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password changed");
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
          <form className="flex flex-col gap-3">
            <label>Current password</label>
            <input
              type="password"
              className="bg-base text-base text-light placeholder:text-base-light rounded-md p-2 w-full h-[50px]"
              placeholder="Current password"
            />
            <label>New password</label>
            <input
              type="password"
              className="bg-base text-base text-light placeholder:text-base-light rounded-md p-2 w-full h-[50px]"
              placeholder="New password"
            />
            <label>Repeat your password</label>
            <input
              type="password"
              className="bg-base text-base text-light placeholder:text-base-light rounded-md p-2 w-full h-[50px]"
              placeholder="Repeat new password"
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
