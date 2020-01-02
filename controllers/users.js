const getTableData = (req, res, db) => {
  db.select("*")
    .from("users")
    .then(items => {
      if (items.length) {
        res.json(items);
      } else {
        res.json({ dataExists: "false" });
      }
    })
    .catch(err => res.status(400).json({ dbError: "db error" }));
};

const getRowData = (req, res, db) => {
  const { id } = req.params.id;
  db.select("*")
    .from("users")
    .where({ id })
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        res.json({ dataExists: "false" });
      }
    })
    .catch(err => res.status(400).json({ dbError: "db error" }));
};

const postTableData = (req, res, db) => {
  const { userName, email, password, location, hobby } = req.body;
  db("users")
    .insert({ userName, email, password, location, hobby })
    .returning("*")
    .then(item => {
      res.json(item);
    })
    .catch(err => res.status(400).json({ dbError: "db error" }));
};

const putTableData = (req, res, db) => {
  const id = req.params.id;
  const { userName, email, password, location, hobby } = req.body;
  db("users")
    .where({ id })
    .update({ userName, email, password, location, hobby })
    .returning("*")
    .then(item => {
      res.json(item);
    })
    .catch(err => res.status(400).json({ dbError: "db error" }));
};

const deleteTableData = (req, res, db) => {
  const { id } = req.params.id;
  db("users")
    .where({ id })
    .del()
    .then(() => {
      res.json({ delete: "true" });
    })
    .catch(err => res.status(400).json({ dbError: "db error" }));
};

module.exports = {
  getTableData,
  getRowData,
  postTableData,
  putTableData,
  deleteTableData
};
