import React from "react";
import { NavBar } from "../../components/NavBar";
import { NavBarMobile } from "../../components/NavBarMobile";

export const MainPage = () => {
    return (
        <div className="h-screen flex flex-col tablet:flex-row">
            <div className="hidden tablet:block">
                <NavBar />
            </div>
            <div className="h-full">
                <h1>Discovery</h1>
            </div>
            <div className="h-min-content tablet:hidden">
                <NavBarMobile/>
            </div>
        </div>
    )
}