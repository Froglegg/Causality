const getTableData = (req, res, db) => {
  db.select("*")
    .from("journals")
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
  const { id } = req.params;
  db.select("*")
    .from("journals")
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
  const { user, journalName, condition, data } = req.body;
  db("journals")
    .insert({ user, journalName, condition, data })
    .returning("*")
    .then(item => {
      res.json(item);
    })
    .catch(err => res.status(400).json({ dbError: "db error" }));
};

const putTableData = (req, res, db) => {
  const id = req.params.id;
  const { user, journalName, condition, data, causality } = req.body;
  db("journals")
    .where({ id })
    .update({ user, journalName, condition, data, causality })
    .returning("*")
    .then(item => {
      res.json(item);
    })
    .catch(err => res.status(400).json({ dbError: "db error" }));
};

const deleteTableData = (req, res, db) => {
  const { id } = req.params.id;
  db("journals")
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
