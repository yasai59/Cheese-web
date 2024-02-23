import React from "react";

export const Input = ({type, className, placeholder, ref, name=""}) => {
  return <>
    <input 
      type={type} 
      className={`bg-base text-base text-light placeholder:text-base-light rounded-md p-2 w-full h-[50px] ${className}`}
      placeholder={placeholder}
      ref={ref}
    />  
  </>;
};
