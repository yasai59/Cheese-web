import React from "react";
import { useContext } from "react";
import UserContext from "../../../context/UserContext";

export const RestrictionsSelect = ({ itemActive, setItemActive }) => {
  const { allRestrictions } = useContext(UserContext);

  return (
    <div className="grid grid-cols-3 gap-5 mb-5">
      <div
        className={`w-full bg-base aspect-square flex rounded-lg cursor-pointer justify-center items-center ${
          itemActive.id === 3 &&
          "bg-gradient-to-br from-yellow-400 to-rose-400  text-black font-bold"
        }`}
        onClick={() => setItemActive(allRestrictions.find((r) => r.id === 3))}
      >
        Omnivore
      </div>
      <div
        className={`w-full bg-base aspect-square flex rounded-lg cursor-pointer justify-center items-center ${
          itemActive.id === 2 &&
          "bg-gradient-to-br from-yellow-400 to-terciary  text-black font-bold"
        }`}
        onClick={() => setItemActive(allRestrictions.find((r) => r.id === 2))}
      >
        Vegetarian
      </div>
      <div
        className={`w-full bg-base aspect-square flex rounded-lg cursor-pointer justify-center items-center ${
          itemActive.id === 1 &&
          "bg-gradient-to-br from-yellow-400 to-terciary  text-black font-bold"
        }`}
        onClick={() => setItemActive(allRestrictions.find((r) => r.id === 1))}
      >
        Vegan
      </div>
    </div>
  );
};
