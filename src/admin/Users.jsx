import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { User } from "./components/User";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/api/user/getAll").then((res) => {
      setUsers(res.data.users);
      console.log(res.data.users);
    });
  }, []);

  return (
    <div>
      <h1 className="text-5xl font-bold mb-10 ml-5 mt-5">Users</h1>
      <div className="w-full flex justify-center">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered input-md w-[70%]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex gap-5 flex-wrap m-5">
        {users
          .filter(
            (user) =>
              user.username?.toLowerCase().includes(search.toLowerCase()) ||
              user.email?.toLowerCase().includes(search.toLowerCase())
          )
          .map((user, index) => {
            return <User user={user} key={user.id} setUser={() => {}} />;
          })}
      </div>
    </div>
  );
};
