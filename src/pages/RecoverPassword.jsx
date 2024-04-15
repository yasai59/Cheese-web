import React from "react";
import { Input } from "../components/Input";
import { FormButton } from "../components/FormButton";
import { useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export const RecoverPassword = () => {
  const [queryParameters] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const code = queryParameters.get("code");
  const email = queryParameters.get("email");

  if (!code || !email) {
    return <Navigate to={"/login"} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axios
      .put("/api/user/reset-password", {
        email,
        code,
        password,
      })
      .then((res) => {
        alert("Password updated successfully");
        navigate("/login");
      })
      .catch((err) => {
        alert("An error occurred");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        className="flex flex-col gap-10 tablet:w-[50%] p-5"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold text-light">Set your new password</h1>
        <Input
          type={"password"}
          placeholder={"New password"}
          value={password}
          setValue={setPassword}
        />
        <Input
          type={"password"}
          placeholder={"Confirm password"}
          value={confirmPassword}
          setValue={setConfirmPassword}
        />
        <FormButton title={"Recover password"} className={"w-full"} />
        <div>
          <Link to={"/login"} className="text-primary underline ">
            Back to login
          </Link>
        </div>
      </form>
    </div>
  );
};
