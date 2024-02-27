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

    const { login } = useContext(UserContext);

    useEffect(() => {
        axios.defaults.baseURL = "http://localhost:3000";
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (username === "" || email === "" || password === "" || repeatPassword === "") {
            alert("All fields are required");
            return;
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            alert("Invalid email");
            return;
        }
        if (password !== repeatPassword) {
            alert("Passwords don't match");
            return;
        }
        if (!acceptTerms) {
            alert("You must accept the terms and conditions");
            return;
        }

        try {
            const res = await axios.post("/api/user", {
                user: {
                    username,
                    email,
                    password,
                    role_id: restaurantAccount ? 2 : 1
                }
            });


            console.log("Registration succesful", res.data);
            login(username, password);
        } catch (err) {
            console.error(err);
            alert(`Registration failed`);
        }
    }

    return (
        <main className="h-screen flex justify-center items-center">
            <section className="flex flex-col justify-center w-[50%]">
                <Link to="/login" className="text-primary flex items-center justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z" /></svg>
                    Back
                </Link>
                <h1 className="text-light font-bold text-4xl mb-4">Sign up</h1>
                <form className="w-full flex flex-col gap-4" onSubmit={handleRegister}>
                    <div>
                        <label className="text-light text-sm" htmlFor="">Username</label>
                        <Input type={"text"} placeholder={"Username"} value={username} setValue={setUsername}/>
                    </div>
                    <div>
                        <label className="text-light text-sm" htmlFor="">Email</label>
                        <Input type={"text"} placeholder={"Email"} value={email} setValue={setEmail}/>
                    </div>
                    <div>
                        <label className="text-light text-sm" htmlFor="">Password</label>
                        <Input type={"password"} placeholder={"Password"} value={password} setValue={setPassword}/>
                    </div>
                    <div>
                        <label className="text-light text-sm" htmlFor="">Repeat Password</label>
                        <Input type={"password"} placeholder={"Repeat your password"} value={repeatPassword} setValue={setRepeatPassword}/>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Checkbox id={"terms"} name={"terms"} value={acceptTerms} setValue={setAcceptTerms}/>
                            <label htmlFor="terms" className="text-light text-sm">I accept <span className="underline text-primary">terms & conditions</span> of privacy</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id={"news"} name={"news"} value={receiveNews} setValue={setReceiveNews}/>
                            <label htmlFor="news" className="text-light text-sm">I would like to receive news about this service</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id={"restaurantAcc"} name={"restaurantAcc"} value={restaurantAccount} setValue={setRestaurantAccount} />
                            <label htmlFor="restaurantAcc" className="text-light text-sm">I want to create an account only for managing a restaurant</label>
                        </div>
                    </div>
                    <FormButton title={"Register"} />
                </form>
            </section>
        </main>
    )
}