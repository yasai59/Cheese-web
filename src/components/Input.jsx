import React from "react";

export const Input = ({type, className, placeholder, value="", setValue, name=""}) => {
  return <>
    <input 
      type={type} 
      name={name}
      className={`bg-base text-base text-light placeholder:text-base-light rounded-md p-2 w-full h-[50px] ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />  
  </>;
};
