import React from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Pill } from "../components/Pill";
import { useState } from "react";
import { useRef } from "react";

export const Tastes = () => {
  const { allTastes, updateAllTastesAndRestrictions } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const addTasteRef = useRef(null);

  const handleAddTaste = (e) => {
    e.preventDefault();
    const name = addTasteRef.current.value;

    addTasteRef.current.value = "";

    if (!name) return;

    console.log(name);
    updateAllTastesAndRestrictions();
  };

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold my-5 p-5">Tastes</h1>
        <div className="flex p-5">
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* add Taste form */}
        <form className="w-full flex gap-5 mt-7 p-5" onSubmit={handleAddTaste}>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Add Taste"
            ref={addTasteRef}
          />
          <input
            type="submit"
            className="btn btn-primary"
            value="Add Taste to List"
          />
        </form>
        <div className="flex gap-5 flex-wrap my-5 p-5">
          {allTastes
            .filter((taste) => taste.name.includes(search))
            .map((taste) => (
              <Pill key={taste.id} text={taste.name} />
            ))}
        </div>
      </div>
    </div>
  );
};
