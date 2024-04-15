import React from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Pill } from "../components/Pill";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";

export const Restrictions = () => {
  const { allRestrictions, updateAllTastesAndRestrictions } =
    useContext(UserContext);
  const [search, setSearch] = useState("");
  const addTasteRef = useRef(null);

  const handleAddTaste = (e) => {
    e.preventDefault();
    const name = addTasteRef.current.value;

    addTasteRef.current.value = "";

    if (!name) return;

    axios
      .post("/api/restriction/create", {
        name: name,
      })
      .then((res) => {
        updateAllTastesAndRestrictions();
      })
      .catch((e) => {
        alert("Error adding restriction");
      });
  };

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold my-5 p-5">Restrictions</h1>
        <div className="flex p-5">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <form className="w-full flex gap-5 mt-7 p-5" onSubmit={handleAddTaste}>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Add Restriction"
            ref={addTasteRef}
          />
          <input
            type="submit"
            className="btn bg-primary text-black"
            value="Add Restriction"
          />
        </form>
        <div className="flex gap-5 flex-wrap my-5 p-5">
          {allRestrictions
            .filter((restriction) => restriction.name.includes(search))
            .map((restriction) => (
              <Pill key={restriction.id} text={restriction.name} />
            ))}
        </div>
      </div>
    </div>
  );
};
