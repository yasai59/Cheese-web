import React from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { FormButton } from "../../components/FormButton";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const RememberPassword = () => {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        axios.defaults.baseURL = "http://localhost:3000";
    }, [])

    const handleRecover = async (e) => {
        e.preventDefault();
        if (!email) {
            setError("Email field is required");
            return;
        }
        await axios.post('/api/user/forgot-password', { email })
        .then(() => {
            alert("We have sent you an email to recover your account");
            setEmail("");
        })
        .catch((err) => {
            if (err.response.status === 400) {
                setError("We couldn't find an account with that email");
                return;
            }
            console.log(err.response.data.message);
            alert("Server error");
        });
        

    }

    return (
        <main className="h-screen flex justify-center items-center">
            <section className="grid grid-cols-1 gap-4 px-4 container">
                <Link to="/login" className="text-primary flex items-center justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z" /></svg>
                    Back
                </Link>
                <form className="flex flex-col gap-4" onSubmit={handleRecover}>
                    <h1 className="text-light font-bold text-4xl">Recover your account</h1>
                    <div>
                        <label className="text-light mb-10" htmlFor="email">Email</label>
                        <Input type={"text"} name="email" placeholder={"ex. bob@yasai.com"} value={email} setValue={setEmail}/>
                    </div>
                    {error && <p className="text-red-500 text-base">{error}</p>}
                    <FormButton title={"Recover"} className={"bg-primary"} />
                </form>
                <p className="text-base">If an account with that mail exists we will send you a link to recover your account</p>
            </section>
        </main>
    );
}