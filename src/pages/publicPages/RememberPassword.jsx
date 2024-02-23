import React from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { FormButton } from "../../components/FormButton";

export const RememberPassword = () => {
    return (
        <main className="h-screen flex justify-center items-center">
            <section className="flex flex-col w-[70%] gap-4">
                <Link to="/login" className="text-primary flex items-center justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z" /></svg>
                    Back
                </Link>
                <form className="flex flex-col gap-4">
                    <h1 className="text-light font-bold text-4xl">Recover your account</h1>
                    <div>
                        <label className="text-light mb-10" htmlFor="email">Email</label>
                        <Input type={"text"} name="email" placeholder={"ex. bob@yasai.com"}/>
                    </div>
                    <FormButton title={"Recover"} className={"bg-primary"} />
                </form>
                <p className="text-base">If an account with that mail exists we will send you a link to recover your account</p>
            </section>
        </main>
    );
}