import React, { useState } from "react";
import { Highlight } from "./Highlight";
import { Alert, Button } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";

export const ExternalApi = () => {
  const [state, setState] = useState({ showResult: false, apiMessage: "", error: null });
  const { getAccessTokenSilently, loginWithPopup, getAccessTokenWithPopup } = useAuth0();

  const handleConsent = async () => {
    try {
      await getAccessTokenWithPopup();
      setState({ ...state, error: null });
    } catch (error) {
      setState({ ...state, error: error.error });
    }
    await callApi();
  };

  const handleLoginAgain = async () => {
    try {
      await loginWithPopup();
      setState({ ...state, error: null });
    } catch (error) {
      setState({ ...state, error: error.error });
    }
    await callApi();
  };

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const testApi = `http://localhost:${process.env.REACT_APP_SERVER_PORT}/api/external`;
      const response = await fetch(testApi, { headers: { Authorization: `Bearer ${token}` } });
      const responseData = await response.json();
      setState({ ...state, showResult: true, apiMessage: responseData });
    } catch (error) {
      setState({ ...state, error: error.error });
    }
  };

  const handle = (e, fn) => {
    e.preventDefault();
    fn();
  };

  const WarningAlert = (message, fn) => (
    <Alert color="warning">
      You need to
      <a href="#/" class="alert-link" onClick={(e) => handle(e, fn)}>
        {message}
      </a>
    </Alert>
  );

  return (
    <>
      <div className="mb-5">
        {state.error === "consent_required" && <WarningAlert message="consent to get access to users api" fn={handleConsent} />}
        {state.error === "login_required" && <WarningAlert message="log in again" fn={handleLoginAgain} />}
        <h1>External API</h1>
        <p className="lead">Ping an external API by clicking the button below.</p>
        <p>
          This will call a local API on port 8001 that would have been started if you run <code>npm run dev</code>. An access token is sent as part of the request's `Authorization` header and the API will validate it using the API's audience value.
        </p>
        <Button color="primary" className="mt-5" onClick={callApi}>
          Ping API
        </Button>
      </div>
      <div className="result-block-container">
        {state.showResult && (
          <div className="result-block" data-testid="api-result">
            <h6 className="muted">Result</h6>
            <Highlight>
              <span>{JSON.stringify(state.apiMessage, null, 2)}</span>
            </Highlight>
          </div>
        )}
      </div>
    </>
  );
};
