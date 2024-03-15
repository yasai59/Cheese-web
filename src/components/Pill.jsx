export const Pill = ({ text, activate = false, onClick = () => {} }) => {
  return (
    <div
      className={`bg-base w-min h-min p-1 px-3 rounded-full cursor-pointer text-light select-none ${
        activate &&
        `bg-gradient-to-br from-yellow-400 to-rose-400 !text-black font-bold`
      }`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};
