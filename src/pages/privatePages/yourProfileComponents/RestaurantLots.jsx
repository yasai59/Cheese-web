import React from "react";
import { useContext } from "react";
import UserContext from "../../../context/UserContext";
import { Option } from "./Option";
import { Modal } from "../../../components/Modal";

export const RestaurantLots = () => {
  const { user } = useContext(UserContext);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Option
        title="Restaurant lots"
        content={user.lot_number}
        type="text"
        onClick={handleOpen}
      />
      <Modal open={open} setOpen={setOpen}>
        <div className="flex flex-col">
          <h1 className="text-3xl text-light font-bold my-5">
            Change restaurant lots
          </h1>
          <form className="flex flex-col gap-3">
            <label>
              How many restaurants would you like to see before choosing?
            </label>
            <input
              type="number"
              min={1}
              max={20}
              className="bg-base text-base text-light placeholder:text-base-light rounded-md p-2 w-full h-[50px]"
              placeholder="New restaurant lots"
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
