import React from "react";
import { useContext } from "react";
import UserContext  from "../context/UserContext";

export const Navigation = () => {
    const { logout } = useContext(UserContext);

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    }

    return (
        <div>
            <nav className="h-full flex flex-col items-center bg-base-dark text-light border-r border-text-light p-4">
                <div className="flex justify-center items-center gap-4 h-20">
                    <img className="w-10" src="/assets/isotipoCheese.png" alt="logo of the platorm" />
                    <h1 className="text-2xl font-bold font-anto text-primary uppercase">Cheese</h1>
                </div>
                <div className="flex flex-col gap-4">
                    <div>

                        <a href="/" className="hover:underline">Discover</a>
                    </div>
                    <a href="/about" className="hover:underline">Liked history</a>
                    <a href="#" className="hover:underline">Your restaurants</a>
                    <a href="#" className="hover:underline">Favorite restaurants</a>
                    <a href="#" className="hover:underline">Your profile</a>
                    <button type="button" onClick={handleLogout}>Log Out</button>
                </div>
                </nav>
        </div>
    )
}