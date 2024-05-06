export const Pill = ({ text, activate = false, onClick = false }) => {
  const realClick = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`bg-base w-min h-min p-1 px-3 rounded-full ${
        onClick ? "cursor-pointer" : ""
      } text-light select-none ${
        activate &&
        `bg-gradient-to-br from-yellow-400 to-rose-400 !text-black font-bold`
      }`}
      onClick={realClick}
    >
      {text}
    </div>
  );
};
