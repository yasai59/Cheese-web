import React from "react";

export const LoginGoogle = ({title, className, onClick = () => {}}) => {
    return <>
        <button className={`flex rounded-md justify-between bg-base text-base h-[50px] ${className}`} onClick={onClick}>
            <div className={`flex h-full items-center justify-center logo px-6 border-r-2 border-base-light`}>
                <img className="w-[40px]" src="/assets/google-logo.png" alt="Google logo" />
            </div>
            <div className={`text-light flex justify-center items-center h-full w-full`}>
                {title}
            </div>
        </button>
    </>
}