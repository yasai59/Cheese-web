import React from "react";
import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

export const AdminRoutes = () => {
  const { logout } = useContext(UserContext);

  return (
    <div className="min-h-screen flex flex-col tablet:flex-row w-full">
      <nav>
        <ul className="[&>li>a]:flex [&>li>a]:items-center [&>li>a>svg]:mr-3 [&>li>a]:text-2xl [&>li]:mb-2 [&>li>a]:px-2">
          <li>
            <Link to="/admin">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M13 8V4q0-.425.288-.712T14 3h6q.425 0 .713.288T21 4v4q0 .425-.288.713T20 9h-6q-.425 0-.712-.288T13 8M3 12V4q0-.425.288-.712T4 3h6q.425 0 .713.288T11 4v8q0 .425-.288.713T10 13H4q-.425 0-.712-.288T3 12m10 8v-8q0-.425.288-.712T14 11h6q.425 0 .713.288T21 12v8q0 .425-.288.713T20 21h-6q-.425 0-.712-.288T13 20M3 20v-4q0-.425.288-.712T4 15h6q.425 0 .713.288T11 16v4q0 .425-.288.713T10 21H4q-.425 0-.712-.288T3 20m2-9h4V5H5zm10 8h4v-6h-4zm0-12h4V5h-4zM5 19h4v-2H5zm4-2"
                />
              </svg>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/users">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 256 256"
              >
                <path
                  fill="currentColor"
                  d="M244.8 150.4a8 8 0 0 1-11.2-1.6A51.6 51.6 0 0 0 192 128a8 8 0 0 1-7.37-4.89a8 8 0 0 1 0-6.22A8 8 0 0 1 192 112a24 24 0 1 0-23.24-30a8 8 0 1 1-15.5-4A40 40 0 1 1 219 117.51a67.94 67.94 0 0 1 27.43 21.68a8 8 0 0 1-1.63 11.21M190.92 212a8 8 0 1 1-13.84 8a57 57 0 0 0-98.16 0a8 8 0 1 1-13.84-8a72.06 72.06 0 0 1 33.74-29.92a48 48 0 1 1 58.36 0A72.06 72.06 0 0 1 190.92 212M128 176a32 32 0 1 0-32-32a32 32 0 0 0 32 32m-56-56a8 8 0 0 0-8-8a24 24 0 1 1 23.24-30a8 8 0 1 0 15.5-4A40 40 0 1 0 37 117.51a67.94 67.94 0 0 0-27.4 21.68a8 8 0 1 0 12.8 9.61A51.6 51.6 0 0 1 64 128a8 8 0 0 0 8-8"
                />
              </svg>
              Users
            </Link>
          </li>
          <li>
            <Link to="/admin/restaurants">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M1 22c0 .54.45 1 1 1h13c.56 0 1-.46 1-1v-1H1zM8.5 9C4.75 9 1 11 1 15h15c0-4-3.75-6-7.5-6m-4.88 4c1.11-1.55 3.47-2 4.88-2s3.77.45 4.88 2zM1 17h15v2H1zM18 5V1h-2v4h-5l.23 2h9.56l-1.4 14H18v2h1.72c.84 0 1.53-.65 1.63-1.47L23 5z"
                />
              </svg>
              Restaurants
            </Link>
          </li>
          <li>
            <Link to="/admin/reports">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 17q.425 0 .713-.288T13 16q0-.425-.288-.712T12 15q-.425 0-.712.288T11 16q0 .425.288.713T12 17m-1-4h2V7h-2zm-2.75 8L3 15.75v-7.5L8.25 3h7.5L21 8.25v7.5L15.75 21zm.85-2h5.8l4.1-4.1V9.1L14.9 5H9.1L5 9.1v5.8zm2.9-7"
                />
              </svg>
              Reports
            </Link>
          </li>
          <li>
            <Link to="/admin/tastes">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 48 48"
              >
                <g fill="none">
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                    d="M33.375 33.874c4.243-4.242 1.414-18.384-4.95-24.748c-2.828-2.829-10.96-8.84-19.799 0c-8.839 8.838-2.828 16.97 0 19.799c6.364 6.364 20.506 9.192 24.749 4.95"
                  />
                  <path
                    stroke="currentColor"
                    stroke-width="4"
                    d="m41 41l-7-7"
                  />
                  <circle
                    cx="42.193"
                    cy="40.071"
                    r="2.5"
                    fill="currentColor"
                    transform="rotate(135 42.193 40.071)"
                  />
                  <circle
                    cx="40.072"
                    cy="42.192"
                    r="2.5"
                    fill="currentColor"
                    transform="rotate(135 40.072 42.192)"
                  />
                  <circle cx="17" cy="18" r="2" fill="currentColor" />
                  <circle cx="12" cy="21" r="2" fill="currentColor" />
                  <circle cx="17" cy="24" r="2" fill="currentColor" />
                </g>
              </svg>
              Tastes
            </Link>
          </li>
          <li>
            <Link to="/admin/restrictions">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 256 256"
              >
                <path
                  fill="currentColor"
                  d="M128 20a108 108 0 1 0 108 108A108.12 108.12 0 0 0 128 20m84 108a83.6 83.6 0 0 1-16.75 50.28L77.72 60.75A84 84 0 0 1 212 128m-168 0a83.6 83.6 0 0 1 16.75-50.28l117.53 117.53A84 84 0 0 1 44 128"
                />
              </svg>
              Restrictions
            </Link>
          </li>
          <li>
            <Link to="/" onClick={logout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
                />
              </svg>
              Log out
            </Link>
          </li>
        </ul>
      </nav>
      <main className="bg-red-500 flex-grow">
        <Routes>
          <Route path="/admin" element={<h1>admin</h1>} />
          <Route path="/admin/users" element={<h1>users</h1>} />
          <Route path="/admin/restaurants" element={<h1>restaurants</h1>} />
          <Route path="/admin/reports" element={<h1>reports</h1>} />
          <Route path="/admin/tastes" element={<h1>tastes</h1>} />
          <Route path="/admin/restrictions" element={<h1>restrictions</h1>} />

          <Route path="/*" element={<Navigate to={"/admin"} />} />
        </Routes>
      </main>
    </div>
  );
};
