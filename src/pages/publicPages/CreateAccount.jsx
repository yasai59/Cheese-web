import React from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Checkbox } from "../../components/Checkbox";
import { FormButton } from "../../components/FormButton";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

export const CreateAccount = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [receiveNews, setReceiveNews] = React.useState(false);
  const [restaurantAccount, setRestaurantAccount] = React.useState(false);
  const [error, setError] = React.useState("");

  const { login } = useContext(UserContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      repeatPassword === ""
    ) {
      setError("All fields are required");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setError("Email format is not valid");
      return;
    }
    if (password !== repeatPassword) {
      setError("Passwords don't match");
      return;
    }
    if (!acceptTerms) {
      setError("You must accept the terms and conditions");
      return;
    }

    try {
      const res = await axios.post("/api/user", {
        username,
        email,
        password,
        role_id: restaurantAccount ? 2 : 1,
      });
      login(username, password);
    } catch (err) {
      console.error(err);
      alert(`Registration failed`);
    }
  };

  return (
    <main className="h-screen flex justify-center items-centerº">
      <section className="flex flex-col px-4 justify-center container">
        <Link
          to="/login"
          className="text-primary flex items-center justify-start"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-light font-bold text-4xl mb-4">Sign up</h1>
        <form className="w-full flex flex-col gap-4" onSubmit={handleRegister}>
          <div>
            <label className="text-light text-sm" htmlFor="">
              Username
            </label>
            <Input
              type={"text"}
              placeholder={"Username"}
              value={username}
              setValue={setUsername}
            />
          </div>
          <div>
            <label className="text-light text-sm" htmlFor="">
              Email
            </label>
            <Input
              type={"text"}
              placeholder={"Email"}
              value={email}
              setValue={setEmail}
            />
          </div>
          <div>
            <label className="text-light text-sm" htmlFor="">
              Password
            </label>
            <Input
              type={"password"}
              placeholder={"Password"}
              value={password}
              setValue={setPassword}
            />
          </div>
          <div>
            <label className="text-light text-sm" htmlFor="">
              Repeat Password
            </label>
            <Input
              type={"password"}
              placeholder={"Repeat your password"}
              value={repeatPassword}
              setValue={setRepeatPassword}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id={"terms"}
                name={"terms"}
                value={acceptTerms}
                setValue={setAcceptTerms}
              />
              <label htmlFor="terms" className="text-light text-sm">
                I accept{" "}
                <span className="underline text-primary">
                  terms & conditions
                </span>{" "}
                of privacy
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id={"news"}
                name={"news"}
                value={receiveNews}
                setValue={setReceiveNews}
              />
              <label htmlFor="news" className="text-light text-sm">
                I would like to receive news about this service
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id={"restaurantAcc"}
                name={"restaurantAcc"}
                value={restaurantAccount}
                setValue={setRestaurantAccount}
              />
              <label htmlFor="restaurantAcc" className="text-light text-sm">
                I want to create an account only for managing a restaurant
              </label>
            </div>
            {error && <p className="text-red-500 text-base">{error}</p>}
          </div>
          <FormButton title={"Register"} />
        </form>
      </section>
    </main>
  );
};
