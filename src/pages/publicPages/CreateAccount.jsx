import React from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input";

export const CreateAccount = () => {
    return (
        <main className="h-screen flex justify-center items-center">
            <section className="">
                <Link to="/login" className="text-primary flex items-center justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z" /></svg>
                    Back
                </Link>
                <h1 className="text-light font-bold text-4xl">Sign up</h1>
                <form>
                    <div>
                        <label htmlFor=""></label>
                        <Input type={"text"} placeholder={"Username"} />
                    </div>
                    <div>
                        <label htmlFor=""></label>
                        <Input type={"text"} placeholder={"Email"} />
                    </div>
                    <div>
                        <label htmlFor=""></label>
                        <Input type={"password"} placeholder={"Password"} />
                    </div>
                    <div>
                        <label htmlFor=""></label>
                        <Input type={"password"} placeholder={"Repeat your password"} />
                    </div>
                    <div>
                        
                    </div>
                </form>
            </section>
        </main>
    )
}