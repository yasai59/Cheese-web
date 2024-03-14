import React from "react";
import { Pill } from "../../components/Pill";
import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

const Option = ({ title, content, onClick, type = "text", className }) => {
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

export const YourProfile = () => {
  const image = useRef(null);
  const { user, tastes, restrictions, logout } = useContext(UserContext);

  console.log({ tastes, restrictions });

  console.log(user);

  const getImage = async () => {
    const res = await fetch(axios.defaults.baseURL + "/api/user/photo", {
      headers: {
        "x-token": localStorage.getItem("token"),
      },
    });
    let blob = res.blob();
    blob = await blob;
    blob = new Blob([blob], { type: "image/png" });
    const url = URL.createObjectURL(blob);
    return url;
  };

  useEffect(() => {
    getImage().then((url) => {
      image.current.style.backgroundImage = `url(${url})`;
    });
  });

  return (
    <div className="w-full mx-auto flex flex-col">
      <h1 className="text-4xl text-light font-bold my-5 ms-5">Your Profile</h1>
      <div className="self-center my-5">
        <div className="w-36 h-36 rounded-full bg-cover" ref={image}></div>
        <p className="text-light text-center mt-5 text-xl">{user.username}</p>
      </div>
      <section className="grid laptop:grid-cols-2">
        <Option title="Email" content={user.email} type="text" />
        <Option
          title="Password"
          content="***************"
          type="text"
          onClick={() => alert("Contraseña")}
        />
        <div className="flex flex-col laptop:hidden">
          <Option
            title={"Tastes"}
            content={"taste 1, taste 2, taste 3"}
            type="text"
            onClick={() => alert("Tastes")}
          />
          <Option
            title={"Restrictions"}
            content={"restriction 1, restriction 2, restriction 3"}
            type="text"
            onClick={() => alert("Restrictions")}
          />
        </div>

        <Option
          title="Restaurant lots"
          content={user.lot_number}
          type="text"
          onClick={() => alert("Restaurant lot")}
        />
        <div className="tablet:hidden">
          <Option
            title="Log out"
            content="Log out"
            type="button"
            onClick={logout}
          />
        </div>
        <div className="flex flex-col laptop:flex-row">
          <Option
            title="Change to Restaurant account"
            content="Change account type"
            type="button"
            onClick={() => alert("restaurante")}
          />

          <Option
            title="Deactivate your account"
            content="Deactivate account"
            type="button"
            className="bg-secondary text-black"
            onClick={() => alert("delete account")}
          />
        </div>

        <div className="hidden laptop:grid row-start-1 row-end-3 col-start-2 ">
          <div className="m-5 bg-base rounded-xl p-3 flex flex-col">
            <h5 className="text-primary">Tastes</h5>
            <div className="flex flex-wrap gap-3 my-3">
              {tastes.map((taste) => {
                return <Pill text={taste.name} activate={true} />;
              })}
            </div>
            <button
              onClick={() => alert("Tastes")}
              className="w-min self-end mr-5 bg-base-light text-light px-7 py-2 text-3xl rounded-lg h-min grid place-items-center"
            >
              <span className="icon-[mdi--pencil-outline]"></span>
            </button>
          </div>
        </div>
        <div className="hidden laptop:grid row-start-3 row-end-5 col-start-2 w-full">
          <div className="hidden laptop:grid row-start-1 row-end-3 col-start-1 ">
            <div className="m-5 bg-base rounded-xl p-3 flex flex-col">
              <h5 className="text-primary">Restrictons</h5>
              <div className="flex flex-wrap gap-3 my-3">
                {restrictions?.map((restriction) => {
                  return <Pill text={restriction.name} activate={true} />;
                })}
              </div>
              <button
                onClick={() => alert("Restrictions")}
                className="w-min self-end mr-5 bg-base-light text-light px-7 py-2 text-3xl rounded-lg h-min grid place-items-center"
              >
                <span className="icon-[mdi--pencil-outline]"></span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
