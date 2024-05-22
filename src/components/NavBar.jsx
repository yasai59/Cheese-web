import React from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const { logout, user } = useContext(UserContext);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="h-full w-64">
      <nav className="h-full flex flex-col items-center bg-base-dark text-light border-r border-text-light p-4 w-64 fixed">
        <div className="flex justify-center items-center gap-4 h-20">
          <img
            className="w-10"
            src="/assets/isotipoCheese.png"
            alt="logo of the platorm"
          />
          <h1 className="text-4xl font-bold font-anto text-primary uppercase">
            Cheese
          </h1>
        </div>
        <hr className="w-full" />
        <ul className="flex flex-col my-6">
          <Link to="/" className="hover:underline font-bold py-5 text-lg">
            <li className="flex items-center gap-4">
              <svg
                className="scale-[1.75]"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 256 256"
              >
                <path
                  fill="currentColor"
                  d="M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68"
                />
              </svg>
              Discover
            </li>
          </Link>
          <Link
            to="/liked-history"
            className="py-5 hover:underline font-bold text-lg"
          >
            <li className="flex items-center gap-4">
              <svg
                className="scale-[1.75]"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m17.95 13.35l2.825-2.825q.3-.3.7-.3t.7.3q.3.3.3.713t-.3.712l-3.525 3.525q-.3.3-.712.3t-.713-.3l-1.4-1.425q-.3-.3-.3-.7t.3-.7q.3-.3.7-.287t.7.287zm-10.125 4.8q-1.8-1.625-3.088-2.9t-2.125-2.4q-.837-1.125-1.225-2.175T1 8.475q0-2.35 1.575-3.912T6.5 3q1.3 0 2.475.55T11 5.1q.85-1 2.025-1.55T15.5 3q2.025 0 3.4 1.138T20.775 7H18.65q-.45-1-1.325-1.5T15.5 5q-1.275 0-2.2.688T11.575 7.5h-1.15Q9.65 6.375 8.662 5.688T6.5 5q-1.425 0-2.463.988T3 8.474q0 .825.35 1.675t1.25 1.963q.9 1.112 2.45 2.6T11 18.3q.65-.575 1.525-1.325t1.4-1.25l.225.225l.488.488l.487.487l.225.225q-.55.5-1.4 1.238t-1.5 1.312l-.775.7q-.275.275-.675.275t-.675-.275z"
                />
              </svg>
              Liked history
            </li>
          </Link>
          <Link
            to="/your-restaurants"
            className={`py-5 hover:underline font-bold text-lg ${
              user.role_id === 1 ? "hidden" : ""
            }`}
          >
            <li className="flex items-center gap-4">
              <svg
                className="scale-[1.75]"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g fill="none" fillRule="evenodd">
                  <path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                  <path
                    fill="currentColor"
                    d="M18.41 3.287a1 1 0 0 1-.233 1.395l-2.101 1.501a1.965 1.965 0 0 0-.762 2.089l3.343-3.343a1 1 0 1 1 1.414 1.414l-3.343 3.343a1.965 1.965 0 0 0 2.089-.762l1.501-2.101a1 1 0 0 1 1.627 1.162l-1.5 2.102a3.967 3.967 0 0 1-5.234 1.116l-1.736 1.736l4.803 4.804a1 1 0 0 1-1.414 1.414l-4.803-4.803l-4.718 4.717a1 1 0 1 1-1.414-1.414l4.717-4.718l-1.56-1.56l-1.414 1.414a1 1 0 0 1-1.414 0l-2.205-2.204a5 5 0 0 1-.936-5.772c.188-.376.403-.715.859-.79a1 1 0 0 1 .867.28L9.79 9.255l.004.003l2.268 2.268l1.736-1.736a3.967 3.967 0 0 1 1.116-5.233l2.102-1.501a1 1 0 0 1 1.395.232Zm-13.816 3.6a3 3 0 0 0 .874 2.288l1.497 1.497l.707-.707l-3.078-3.079Z"
                  />
                </g>
              </svg>
              Your restaurants
            </li>
          </Link>
          <Link
            to="/favorite-restaurants"
            className="py-5 hover:underline font-bold text-lg"
          >
            <li className="flex items-center gap-4">
              <svg
                className="scale-[1.75]"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m8.85 17.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425zm3.15.45l-4.15 2.5q-.275.175-.575.15t-.525-.2q-.225-.175-.35-.437t-.05-.588l1.1-4.725L3.775 11.8q-.25-.225-.312-.513t.037-.562q.1-.275.3-.45t.55-.225l4.85-.425l1.875-4.45q.125-.3.388-.45t.537-.15q.275 0 .537.15t.388.45l1.875 4.45l4.85.425q.35.05.55.225t.3.45q.1.275.038.563t-.313.512l-3.675 3.175l1.1 4.725q.075.325-.05.588t-.35.437q-.225.175-.525.2t-.575-.15zm0-5.025"
                />
              </svg>
              Favorite restaurants
            </li>
          </Link>
          <Link
            to="/your-profile"
            className="py-5 hover:underline font-bold text-lg"
          >
            <li className="flex items-center gap-4">
              <svg
                className="scale-[1.75]"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path
                    stroke="currentColor"
                    strokeWidth="2.5"
                    d="M21 12a8.958 8.958 0 0 1-1.526 5.016A8.991 8.991 0 0 1 12 21a8.991 8.991 0 0 1-7.474-3.984A9 9 0 1 1 21 12Z"
                  />
                  <path
                    fill="currentColor"
                    d="M12.75 9a.75.75 0 0 1-.75.75v2.5A3.25 3.25 0 0 0 15.25 9zm-.75.75a.75.75 0 0 1-.75-.75h-2.5A3.25 3.25 0 0 0 12 12.25zM11.25 9a.75.75 0 0 1 .75-.75v-2.5A3.25 3.25 0 0 0 8.75 9zm.75-.75a.75.75 0 0 1 .75.75h2.5A3.25 3.25 0 0 0 12 5.75zm-6.834 9.606L3.968 17.5l-.195.653l.444.517zm13.668 0l.949.814l.444-.517l-.195-.653zM9 16.25h6v-2.5H9zm0-2.5a5.252 5.252 0 0 0-5.032 3.75l2.396.713A2.752 2.752 0 0 1 9 16.25zm3 6a7.73 7.73 0 0 1-5.885-2.707L4.217 18.67A10.23 10.23 0 0 0 12 22.25zm3-3.5c1.244 0 2.298.827 2.636 1.963l2.396-.713A5.252 5.252 0 0 0 15 13.75zm2.885.793A7.73 7.73 0 0 1 12 19.75v2.5a10.23 10.23 0 0 0 7.783-3.58z"
                  />
                </g>
              </svg>
              Your profile
            </li>
          </Link>
        </ul>
        <hr className="w-full" />
        <div className="flex items-center gap-4 mt-6 w-full">
          <svg
            className="scale-[1.75]"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4q0 .425-.288.713T11 5H5v14h6q.425 0 .713.288T12 20q0 .425-.288.713T11 21zm12.175-8H10q-.425 0-.712-.288T9 12q0-.425.288-.712T10 11h7.175L15.3 9.125q-.275-.275-.275-.675t.275-.7q.275-.3.7-.313t.725.288L20.3 11.3q.3.3.3.7t-.3.7l-3.575 3.575q-.3.3-.712.288t-.713-.313q-.275-.3-.262-.712t.287-.688z"
            />
          </svg>
          <button
            className="font-bold text-lg"
            type="button"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </nav>
    </div>
  );
};
