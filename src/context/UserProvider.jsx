import React from "react";
import UserContext from "./UserContext";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export const UserProvider = ({ children }) => {
  let localUser = localStorage.getItem("user");

  const [user, setUser] = useState(localUser ? JSON.parse(localUser) : null);
  const [token, setToken] = useState(localStorage.getItem("token") ?? null);
  const [tastes, setTastes] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [allTastes, setAllTastes] = useState([]);
  const [allRestrictions, setAllRestrictions] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  axios.defaults.baseURL = "http://localhost:3000";
  useEffect(() => {
    if(!token) return;

    axios.defaults.headers.common["x-token"] = localStorage.getItem("token");
    axios.get("/api/taste").then((res) => {
      setTastes(res.data.tastes);
    });

    axios.get("/api/restriction").then((res) => {
      setRestrictions(res.data.restrictions);
    });

    axios.get("/api/taste/all").then((res) => {
      setAllTastes(res.data.tastes);
    });

    axios.get("/api/restriction/all").then((res) => {
      setAllRestrictions(res.data.restrictions);
    });

    axios.get("/api/restaurant").then((res) => {
      setRestaurants(res.data);
    });
  }, [token]);

  const login = async (username, password) => {
    try {
      if (!username || !password) return "User and password are required.";
      const res = await axios.post("/api/user/login", {
        username,
        password,
      });

      const { user: userRes } = res.data;
      const { token } = res.data;
      if (!token) return;

      setUser(userRes);
      setToken(token);

      axios.defaults.headers.common["x-token"] = token;

      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(userRes));
    } catch (err) {
      console.log(err.response.data.message);
      return err.response.data.message;
    }
  };

  const loginToken = async (token, user) => {
    setUser(user);
    setToken(token);

    axios.defaults.headers.common["x-token"] = token;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        loginToken,
        token,
        logout,
        tastes,
        restrictions,
        setTastes,
        setRestrictions,
        allTastes,
        allRestrictions,
        restaurants,
        setRestaurants,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
