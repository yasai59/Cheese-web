import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Option } from "./yourProfileComponents/Option";
import { Password } from "./yourProfileComponents/Password";
import { RestaurantLots } from "./yourProfileComponents/RestaurantLots";
import { TastesRestrictions } from "./yourProfileComponents/TastesRestrictions";

export const YourProfile = () => {
  const image = useRef(null);
  const { user, logout } = useContext(UserContext);

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
  }, []);

  const handleChangeImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("photo", file);
      try {
        await axios.post("/api/user/photo", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // Refresh the image after successful upload
        const url = await getImage();
        image.current.style.backgroundImage = `url(${url})`;
      } catch (error) {
        console.error(error);
      }
    };
    input.click();
  };

  return (
    <div className="w-full mx-auto flex flex-col">
      <h1 className="text-4xl text-light font-bold my-5 ms-5">Your Profile</h1>
      <div className="self-center my-5">
        <div
          className="w-36 h-36 rounded-full bg-cover cursor-pointer"
          ref={image}
          onClick={handleChangeImage}
        ></div>
        <p className="text-light text-center mt-5 text-xl">{user.username}</p>
      </div>
      <section className="grid laptop:grid-cols-2">
        <Option title="Email" content={user.email} type="text" />
        <Password />

        <RestaurantLots />
        <TastesRestrictions />
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
      </section>
    </div>
  );
};
