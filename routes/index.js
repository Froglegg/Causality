const path = require("path");
const router = require("express").Router();
const userRoutes = require("./api/users");
const journalRoutes = require("./api/journals");
const functionRoutes = require("./api/functions");
// API Routes
router.use("/api", userRoutes);
router.use("/api", journalRoutes);
router.use("/api", functionRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
