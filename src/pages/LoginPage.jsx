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
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login(user, password)
      .then((result) => {
        setError(result);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
      });
  };

  return (
    <main className="h-screen tablet:h-screen w-full flex flex-col justify-center items-center text-6xl container p-2 md:gap-10">
      <h1 className="hidden text-center laptop:flex font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text p-4 md:p-0">
        Discover a new experience
      </h1>
      <section className="grid grid-cols-1 items-center laptop:grid-cols-2 laptop:p-2">
        <img
          className="tablet:grid-cols-1"
          src="/assets/logoFull.png"
          alt="logo of the platorm"
        />
        <form
          className="h-full justify-center tablet:grid-cols-1 flex flex-col gap-4 px-2 py-4"
          onSubmit={handleLogin}
        >
          <LoginGoogle
            title={"Login with Google"}
            className={"justify-center"}
          />
          <div className="flex items-center">
            <div className="bg-base-light flex-grow h-[1px]"></div>
            <p className="bg-base-dark px-3 text-base-light text-sm">or</p>
            <div className="bg-base-light flex-grow h-[1px]"></div>
          </div>
          <Input
            type={"text"}
            placeholder={"example@example.com"}
            value={user}
            setValue={setUser}
          />
          <Input
            type={"password"}
            placeholder={"*******"}
            value={password}
            setValue={setPassword}
          />
          <FormButton title={"Log In"} />
          {error && <p className="text-red-500 text-base">{error}</p>}
          <div className="flex flex-col items-end justify-center text-primary text-sm gap-4">
            <Link to="/remember-password" className="underline">
              Can't remember your password?
            </Link>
            <Link to="/create-account" className="underline">
              Create an account
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
};
