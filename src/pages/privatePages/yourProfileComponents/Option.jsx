export const Option = ({
  title,
  content,
  onClick,
  type = "text",
  className,
}) => {
  return (
    <div className="flex-grow border-t col-start-1 border-base-light p-3 flex justify-between items-center tablet:border-0 tablet:bg-base tablet:rounded-xl tablet:m-5">
      <div>
        <h5 className="text-primary">{title}</h5>
        {type === "button" ? (
          <button
            className={`text-light mt-3 bg-base  py-1 px-7 rounded-lg ${
              className ? className : "tablet:bg-base-light"
            } `}
            onClick={onClick}
          >
            {content}
          </button>
        ) : (
          <p className="text-light mt-3">{content}</p>
        )}
      </div>
      {onClick && type !== "button" && (
        <button
          onClick={onClick}
          className="mr-5 bg-base tablet:bg-base-light text-light px-7 py-2 text-3xl rounded-lg h-min grid place-items-center"
        >
          <span className="icon-[mdi--pencil-outline]"></span>
        </button>
      )}
    </div>
  );
};
