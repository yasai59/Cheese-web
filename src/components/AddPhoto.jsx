import React from "react";
import { useState } from "react";

export const AddPhoto = ({ handleImageChange = "", selectedImage = "", handleDelete = "" }) => {

  // generate key to remove and add the same image
  const [inputKey, setInputKey] = useState(0);

  const handleNewImageSelected = () => {
    setInputKey(prevKey => prevKey + 1)
  }

  return (
    <div className=" relative flex justify-center gap-4 h-24 w-full mt-2">
      <div className="flex justify-center items-center">

        {selectedImage ? (
          <>
            <button type="button" className="absolute top-0 right-0 text-light font-bold" onClick={handleDelete}>
              X
            </button>
            <img id="image" className="w-24 h-24 object-fit rounded-md" src={selectedImage} alt="Profile photo"/>
          </>
        ) : (
          <label htmlFor="fileInput" className="flex justify-center items-center h-full w-24 border-dashed border-2 border-light rounded-full self-center text-light cursor-pointer">
            <div className="flex justify-center items-center h-full text-light cursor-pointer">
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                key={inputKey}
                onChange={(event) => {
                  handleImageChange(event)
                  handleNewImageSelected()
                }}
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z" /></svg>
            </div>
          </label>
        )}
      </div>

    </div>
  );
}