const router = require("express").Router();
const journals = require("../../controllers/journals");
const db = require("../../db/config"); // importing the knex db config and function
router.get("/journals", (req, res) => journals.getTableData(req, res, db));
router.get("/journals/:id", (req, res) => journals.getRowData(req, res, db));
router.post("/journals", (req, res) => journals.postTableData(req, res, db));
router.put("/journals/:id", (req, res) => journals.putTableData(req, res, db));
router.delete("/journals/:id", (req, res) =>
  journals.deleteTableData(req, res, db)
);

module.exports = router;
