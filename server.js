const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
const helmet = require("helmet"); // creates headers that protect from attacks (security)
const cors = require("cors"); // allows/disallows cross-site communication
const corsOptions = require("./corsOptions");
const morgan = require("morgan"); // logs requests, use "tiny" or "combined"
const db = require("./db/config.js"); // importing the db config

// Define middleware here
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("combined"));

// causality processing function... should this go here , in the controllers, in routes, client utils ?
const utils = require("./utils/app");
// const exampleJournal = require("./utils/exampleJournal");
// let testResponse = utils.causality(exampleJournal);

app.get("/api/testDb", async (req, res) => {
  const users = await db("users"); // making a query to get all users
  console.log(users[0].userName);
  res.send(users[0].userName);
});

app.post("/api/testFunction", async (req, res) => {
  let response = utils.causality(req.body);

  res.send(response);
});

// API calls
app.get("/api/hello", async (req, res) => {
  res.send({ express: "Hello From Express" });
});
app.post("/api/world", (req, res) => {
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

// NODE_ENV is a heroku config
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
