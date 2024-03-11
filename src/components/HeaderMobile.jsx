import React from "react";

export const HeaderMobile = () => {
  return (
    <nav className="flex p-4 border-b border-base-light">
      <img
        className="w-10 mr-3"
        src="/assets/isotipoCheese.png"
        alt="logo of the platorm"
      />
      <h1 className="text-4xl font-bold font-anto text-primary uppercase">
        Cheese
      </h1>
    </nav>
  );
};
