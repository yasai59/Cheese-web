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
import { useState } from "react";

export const YourProfile = () => {
  const image = useRef(null);
  const { user, logout, setUser } = useContext(UserContext);

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

  const [username, setUsername] = useState(user.username);

  const error = useRef(null);

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const submitUsername = () => {
    if (username.length < 3) {
      error.current.textContent = "The username must have 3 characters minimum";
      return;
    }

    const isValidUsername = /^[a-zA-Z0-9!@#$%^&()_+\-=.<>?]*$/;
    if (!isValidUsername.test(username)) {
      error.current.textContent = "Invalid characters in username";
      return;
    }

    axios
      .put("/api/user", {
        ...user,
        username,
      })
      .catch(() => {
        error.current.textContent = "Another user already has this username";
      })
      .then((res) => {
        setUser(res.data.userDb);

        error.current.textContent = "";
      });
  };

  const handleChangeType = () => {
    setUser({ ...user, role_id: user.role_id === 1 ? 2 : 1 });

    axios.put("/api/user", {
      ...user,
      role_id: user.role_id === 1 ? 2 : 1,
    });
  };

  const handleDeactivate = () => {
    const confirm = window.confirm(
      "Are you sure you want to deactivate your account?"
    );

    if (confirm) {
      axios.delete("/api/user").then(() => {
        logout();
      });
    }
  };

  return (
    <div className="w-full mx-auto flex flex-col">
      <h1 className="text-4xl text-light font-bold my-5 ms-5">Your Profile</h1>
      <div className="self-center my-5">
        <div
          className="w-36 h-36 rounded-full bg-cover cursor-pointer mx-auto"
          ref={image}
          onClick={handleChangeImage}
        ></div>
        <p ref={error} className="text-red-500 text-center mt-5"></p>
        <input
          type="text"
          className="text-light text-center text-xl bg-transparent"
          value={username}
          onInput={handleChangeUsername}
        />
        <p
          className={`text-center text-blue-500 cursor-pointer ${
            username === user.username && "hidden"
          }`}
          onClick={submitUsername}
        >
          Change username
        </p>
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
            title={`Change to ${
              user.role_id === 1 ? "restaurant" : "customer"
            } account`}
            content="Change account type"
            type="button"
            onClick={handleChangeType}
          />

          <Option
            title="Deactivate your account"
            content="Deactivate account"
            type="button"
            className="bg-secondary text-black"
            onClick={handleDeactivate}
          />
        </div>
      </section>
    </div>
  );
};
