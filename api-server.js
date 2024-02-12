require('dotenv').config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const { auth } = require("express-oauth2-jwt-bearer");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: `http://localhost:${process.env.REACT_APP_WEB_PORT}` }));

const checkJwt = auth({
  audience: process.env.REACT_APP_AUDIENCE,
  issuerBaseURL: `https://${process.env.REACT_APP_DOMAIN}/`,
  algorithms: ["RS256"],
});

app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!",
  });
});

app.listen(process.env.REACT_APP_SERVER_PORT, () => console.log(`API Server listening on port ${process.env.REACT_APP_SERVER_PORT}`));
