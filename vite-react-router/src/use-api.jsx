import { useEffect, useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export const useApi = (url, options) => {
  const { getAccessTokenSilently } = useAuth0();
  const [state, setState] = useState({
    error: null,
    loading: true,
    data: null,
  });
  useEffect(() => {
    (async () => {
      try {
        const { audience, scope, ...fetchOptions } = options;
        const accessToken = await getAccessTokenSilently({
          authorizationParams: { audience, scope },
        });
        const res = await fetch(url, {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setState({
          ...state,
          data: await res.json(),
          error: null,
          loading: false,
        });
      } catch (error) {
        setState({ ...state, error, loading: false });
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return state;
};

export const ApolloProviderWithToken = ({ children, ...props }) => {
  const { getAccessTokenSilently } = useAuth0();
  const httpLink = new HttpLink({ uri: import.meta.env.VITE_GRAPHQL_ENDPOINT });
  const authLink = setContext(async (_, { headers }) => {
    const { audience, scope } = props;
    const accessToken = await getAccessTokenSilently({
      authorizationParams: { audience, scope },
    });
    return { headers: { ...headers, authorization: `Bearer ${accessToken}` } };
  });
  const client = useRef();
  if (!client.current) {
    client.current = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }
  return (
    <ApolloProvider client={client.current}>
      {children}
    </ApolloProvider>
  );
};
