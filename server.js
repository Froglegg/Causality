const cluster = require("cluster");
const os = require("os");
const numCPUs = require("os").cpus().length;
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
const routes = require("./routes"); // api routes
const helmet = require("helmet"); // creates headers that protect from attacks (security)
const cors = require("cors"); // allows/disallows cross-site communication
const corsOptions = require("./corsOptions");
const morgan = require("morgan"); // logs requests, use "tiny" or "combined"

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  console.log(os.cpus().length);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Listen for dying workers
  cluster.on("exit", (worker, code, signal) => {
    // Replace the dead worker
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  // for each worker, create new instance of express

  // Define middleware here
  require("dotenv").config();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(morgan("combined"));

  // API calls
  app.get("/api/hello", async (req, res) => {
    res.send({ express: "Hello From Express" });
  });

  // Define API routes here
  app.use(routes);

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
}
