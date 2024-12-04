import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { ApolloProviderWithToken } from "./use-api";

const Auth0ProviderWithRedirectCallback = ({ children, ...props }) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };
  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithRedirectCallback
        domain={import.meta.env.VITE_DOMAIN}
        clientId={import.meta.env.VITE_CLIENT_ID}
        authorizationParams={{
          audience: import.meta.env.VITE_AUDIENCE,
          scope: 'profile email read:users',
          redirect_uri: window.location.origin,
        }}
      >
        <ApolloProviderWithToken
          audience={import.meta.env.VITE_AUDIENCE}
          scope={'profile email read:users'}
        >
          <App />
        </ApolloProviderWithToken>
      </Auth0ProviderWithRedirectCallback>
    </BrowserRouter>
  </React.StrictMode>,
);