import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import history from "./utils/history";

const root = createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT_ID}
    onRedirectCallback={(appState, user) => {
      console.log("appState:", appState);
      console.log("user:", user);
      history.push(appState && appState.returnTo ? appState.returnTo : window.location.pathname);
    }}
    authorizationParams={{
      audience: process.env.REACT_APP_AUDIENCE,
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
