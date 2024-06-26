export const Pill = ({ text, activate = false, onClick = false, className = "" }) => {
  const realClick = (e) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`bg-base h-min p-1 px-3 rounded-full ${className ? className : "w-min"} ${
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
