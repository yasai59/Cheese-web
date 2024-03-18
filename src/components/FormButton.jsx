import React from "react";

export const FormButton = ({ title, className, onClick = () => {} }) => {
  return (
    <>
      <button
        className={`flex rounded-md text-black font-bold text-2xl justify-center items-center h-[50px] bg-primary ${className}`}
        onClick={onClick}
      >
        {title}
      </button>
    </>
  );
};
