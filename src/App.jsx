import React from "react";
import { Route, Routes } from "react-router-dom";
import { ExternalApi, Loading, NavBar, Profile } from "./components";
import { Container } from "reactstrap";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

// styles
import "./App.css";

// fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faPowerOff, faUser } from "@fortawesome/free-solid-svg-icons";

function initFontAwesome() {
  library.add(faLink);
  library.add(faUser);
  library.add(faPowerOff);
}
initFontAwesome();

const Home = () => <Container></Container>;

const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <Container className="flex-grow-1 mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={withAuthenticationRequired(Profile, {
              onRedirecting: () => <Loading />,
            })}
          />
          <Route
            path="/external-api"
            element={withAuthenticationRequired(ExternalApi, {
              onRedirecting: () => <Loading />,
            })}
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
