import { useState } from "react";

export const Pill = ({ text, activate = false, setActive }) => {
  const [innerActive, setInnerActive] = useState(activate);

  let handleClick;
  if (setActive) {
    handleClick = () => {
      setInnerActive((prev) => {
        setActive(!prev);
        return !prev;
      });
    };
  } else {
    handleClick = () => {};
  }

  return (
    <div
      className={`bg-base w-min h-min p-1 px-3 rounded-full cursor-pointer text-light select-none ${
        innerActive &&
        `bg-gradient-to-br from-yellow-400 to-rose-400 !text-black font-bold`
      }`}
      onClick={handleClick}
    >
      {text}
    </div>
  );
};
