import React, { useContext, useState, useRef, useEffect } from "react";
import UserContext from "../context/UserContext";
import { Pill } from "../components/Pill";
import axios from "axios";

export const Tastes = () => {
  const { allTastes, updateAllTastesAndRestrictions } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [selectedTastes, setSelectedTastes] = useState([]); // Estado para almacenar los gustos seleccionados
  const addTasteRef = useRef(null);

  useEffect(() => {
    // Actualizar los gustos seleccionados cuando cambie allTastes
    setSelectedTastes((prevSelectedTastes) =>
      prevSelectedTastes.filter((taste) =>
        allTastes.find((item) => item.id === taste.id)
      )
    );
  }, [allTastes]);

  const handleAddTaste = (e) => {
    e.preventDefault();
    const name = addTasteRef.current.value.trim();

    if (!name) return;

    axios
      .post("/api/taste/create", {
        name: name,
      })
      .then((res) => {
        updateAllTastesAndRestrictions();
        addTasteRef.current.value = ""; // Limpiar el campo de entrada después de agregar el gusto
      })
      .catch((error) => {
        console.error("Error adding taste:", error);
        alert("Error adding taste");
      });
  };

  const handleToggleTaste = (taste) => {
    setSelectedTastes((prevSelectedTastes) => {
      // Verificar si el gusto ya está seleccionado
      const isSelected = prevSelectedTastes.some((item) => item.id === taste.id);
      // Actualizar los gustos seleccionados
      return isSelected
        ? prevSelectedTastes.filter((item) => item.id !== taste.id)
        : [...prevSelectedTastes, taste];
    });
  };

  return (
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
      {/* Formulario para agregar gusto */}
      <form className="w-full flex gap-5 mt-7 p-5" onSubmit={handleAddTaste}>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Add Taste"
          ref={addTasteRef}
        />
        <input
          type="submit"
          className="btn bg-primary text-black"
          value="Add Taste"
        />
      </form>
      <div className="flex gap-5 flex-wrap my-5 p-5">
        {allTastes
          .filter((taste) => taste.name.includes(search))
          .map((taste) => (
            <Pill
              key={taste.id}
              text={taste.name}
              selected={selectedTastes.some((item) => item.id === taste.id)} // Marcar si el gusto está seleccionado
              onClick={() => handleToggleTaste(taste)} // Manejar el clic para alternar el gusto seleccionado
            />
          ))}
      </div>
    </div>
  );
};

