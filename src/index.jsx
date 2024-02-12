import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT_ID}
    onRedirectCallback={(appState, user) => {
      console.log("appState:", appState);
      console.log("user:", user);
    }}
    authorizationParams={{
      audience: process.env.REACT_APP_AUDIENCE,
      redirect_uri: window.location.origin,
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
);
