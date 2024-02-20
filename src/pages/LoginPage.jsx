import React from "react";

export const LoginPage = () => {
  return (
    <main className="h-screen w-full  flex justify-center items-end flex-col text-6xl font-bold container mx-auto">
      <h1 className="md:block hidden text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
        Discover a new experience
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-2">
        <img src="/assets/logoFull.png" alt="logo of the platorm" />
      </section>
    </main>
  );
};
