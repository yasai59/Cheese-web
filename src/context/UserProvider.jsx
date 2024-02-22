import React from "react";
import UserContext from "./UserContext";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export const UserProvider = ({ children }) => {
  let localUser = localStorage.getItem("user");

  const [user, setUser] = useState(localUser ? JSON.parse(localUser) : null);
  const [token, setToken] = useState(localStorage.getItem("token") ?? null);

  console.log({ user, token });

  useEffect(() => {
    axios.defaults.baseURL = "https://apicheese.yasai59.com";
  }, []);

  const login = async (user, password) => {
    try {
      const res = await axios.post("/api/user/login", {
        username: user,
        password,
      });

      const { user: userRes } = res.data;
      const { token } = res.data;
      setUser(userRes);
      setToken(token);

      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(userRes));
    } catch (err) {
      console.log(err);
    }

    console.log(res.data);
  };

  return (
    <UserContext.Provider value={{ user, login, token }}>
      {children}
    </UserContext.Provider>
  );
};
