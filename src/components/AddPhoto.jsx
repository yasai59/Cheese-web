import React from "react";
import { useState } from "react";

export const AddPhoto = ({ handleImageChange="", selectedImage="", handleDelete="" }) => {

    // generate key to remove and add the same image
    const [inputKey, setInputKey] = useState(0);

    const handleNewImageSelected = () => {
      setInputKey(prevKey => prevKey + 1)
    }

    return (
        <div className="relative flex justify-center gap-4 h-[100px] mt-2">
            <div className={`border-2 cursor-pointer rounded-full aspect-square overflow-hidden h-full self-center flex justify-center items-center border-dashed border-light ${selectedImage ? "border-none" : ""}`}>
            <input
                key={inputKey}
                type="file"
                className="absolute h-full opacity-0 cursor-pointer"
                onChange={
                  (event) => {
                    handleImageChange(event)
                    handleNewImageSelected()
                  }
                }
            />
                {selectedImage ? (
                  <>
                    <button type="button" className="absolute top-0 right-0 text-light font-bold" onClick={handleDelete}>
                      X
                    </button>
                    <img className="w-full h-full object-cover rounded-md" src={selectedImage} alt="Profile photo"></img>
                  </>
                ) : (
                <span className="text-light">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"/></svg>
                </span>
                )}
            </div>
        </div>
    );
}
