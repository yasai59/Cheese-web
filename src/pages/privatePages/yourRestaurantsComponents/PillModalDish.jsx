import React from "react";
import { Modal } from "../../../components/Modal";
import { Pill } from "../../../components/Pill";
import { useState } from "react";
import { useEffect } from "react";

export const PillModalDish = ({
  open = false,
  setOpen = () => {},
  options = [],
  selectedOptions = [],
  setSelectedOptions,
  title = "",
  children,
  className,
}) => {
  const [innerSelectedOptions, setInnerSelectedOptions] = useState([
    ...selectedOptions,
  ]);

  useEffect(() => {
    setInnerSelectedOptions([...selectedOptions]);
  }, [selectedOptions]);

  const handleClick = (option) => {
    if (innerSelectedOptions.find((lol) => lol.id == option.id)) {
      setInnerSelectedOptions((prev) =>
        prev.filter((lol) => lol.id != option.id)
      );
    } else {
      setInnerSelectedOptions((prev) => [...prev, option]);
    }
  };

  const handleSubmit = () => {
    setSelectedOptions(innerSelectedOptions);
    setOpen(true); /* Así funciona, con false no */
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <h3 className="mb-5">{title}</h3>
      {children}
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {options.map((option) => {
          return (
            <Pill
              text={option.name}
              key={option.name}
              activate={
                !!innerSelectedOptions.find((lol) => lol.id == option.id)
              }
              onClick={() => handleClick(option)}
              className="w-fit"
            />
          );
        })}
      </div>
      <button
        className="px-5 py-3 bg-primary rounded-lg text-black mt-5 font-bold"
        onClick={handleSubmit}
      >
        Change
      </button>
    </Modal>
  );
};
