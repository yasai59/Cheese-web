import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { UserProvider } from "./context/UserProvider.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="291910523360-4v6kvnffki0dkrimogelts3i5l4eecj9.apps.googleusercontent.com">
    <React.StrictMode>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
