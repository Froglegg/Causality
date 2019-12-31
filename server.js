const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
const morgan = require("morgan"); // logs requests
const helmet = require("helmet"); // creates headers that protect from attacks (security)
const cors = require("cors"); // allows/disallows cross-site communication
const corsOptions = require("./corsOptions");

// Define middleware here
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));

app.use(morgan("combined"));

// API calls
app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});
app.post("/api/world", (req, res) => {
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));
