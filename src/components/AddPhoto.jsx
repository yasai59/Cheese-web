import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export const AddPhoto = ({
  setImageDef,
  selectedImage,
  setIsNewImageSelected,
}) => {
  const [image, setImage] = useState(null);
  // generate key to remove and add the same image
  const [inputKey, setInputKey] = useState(0);

  useEffect(() => {
    if (!image && selectedImage) {
      setImage(selectedImage);
    }
  }, [image, selectedImage]);

  const handlePickImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setImageDef && setImageDef(file);
      setIsNewImageSelected && setIsNewImageSelected(true);
    } else {
      setImage(null);
      setImageDef && setImageDef(null);
      setIsNewImageSelected && setIsNewImageSelected(false);
    }
    event.target.value = null;
  };

  const handleNewImageSelected = () => {
    setInputKey((prevKey) => prevKey + 1);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageDef && setImageDef(null);
    setIsNewImageSelected && setIsNewImageSelected(false);
    document.getElementById("fileInput").value = null;
  };

  return (
    <div className=" relative flex justify-center gap-4 h-24 w-full mt-2">
      <div className="flex justify-center items-center">
        {image ? (
          <>
            <button
              type="button"
              className="absolute top-0 right-0 text-light font-bold"
              onClick={() => {
                handleRemoveImage();
              }}
            >
              X
            </button>
            <img
              id="image"
              className="w-24 h-24 object-fit rounded-md"
              src={image}
              alt="Profile photo"
            />
          </>
        ) : (
          <label
            htmlFor="fileInput"
            className="flex justify-center items-center h-full w-24 border-dashed border-2 border-light rounded-full self-center text-light cursor-pointer"
          >
            <div className="flex justify-center items-center h-full text-light cursor-pointer">
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                key={inputKey}
                onChange={(event) => {
                  if (event.currentTarget === event.target) {
                    handlePickImage(event);
                    handleNewImageSelected();
                  }
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
                />
              </svg>
            </div>
          </label>
        )}
      </div>
    </div>
  );
};
