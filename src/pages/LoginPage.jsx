import React from "react";
import { Input } from "../components/Input";
import { LoginGoogle } from "../components/LoginGoogle";
import { FormButton } from "../components/FormButton";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useState } from "react";

export const LoginPage = () => {

  const { login } = useContext(UserContext);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login(user, password);
  }


  return (
    <main className="md:h-screen overflow-auto w-full flex sm:flex-col sm:justify-end sm:items-center md:justify-center text-6xl container mx-auto p-2 md:gap-10">
      <h1 className="md:flex text-end md:justify-end hidden font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text p-4 md:p-0">
        Discover a new experience
      </h1>
      <section className="grid sm:grid-cols-1 md:grid-cols-2 items-center sm:overflow-auto lg:p-2">
        <img className="md:grid-cols-1" src="/assets/logoFull.png" alt="logo of the platorm" />
        <form className="md:grid-cols-1 flex flex-col gap-4 px-2 py-4" onSubmit={handleLogin}>
          <LoginGoogle title={"Login with Google"} className={"justify-center"} />
          <div className="flex items-center">
            <div className="bg-base-light flex-grow h-[1px]"></div>
            <p className="bg-base-dark px-3 text-base-light text-sm">or</p>
            <div className="bg-base-light flex-grow h-[1px]"></div>
          </div>
          <Input type={"text"} placeholder={"example@example.com"} value={user} setValue={setUser}/>
          <Input type={"password"} placeholder={"*******"} value={password} setValue={setPassword}/> 
          <FormButton title={"Log In"}  />
          <div className="flex flex-col items-end justify-center text-primary text-sm gap-4">
            <Link to="/remember-password" className="underline">Can't remember your password?</Link>
            <Link to="/create-account" className="underline">Create an account</Link>
          </div>
        </form>
      </section>
    </main>
  );
};
